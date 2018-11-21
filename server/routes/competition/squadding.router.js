const express = require('express');
const pool = require('../../modules/pool');
const {
  rejectUnauthenticated,
} = require('../../modules/authentication-middleware');
const router = express.Router();

/**
 * GET a list of all UNSQUADDED shooters for a specific event
 * TODO: add another query to get individual squad lists and format the response
 */
router.get('/:event_id', rejectUnauthenticated, async (req, res) => {
  let dataToSend = {};
  try {
    //Returns an array of all unsquadded shooters associated with the currently selected event
    const getUnsquadded = pool.query(`SELECT "shooter"."id", "shooter"."first_name", "shooter"."last_name", "shooter"."handicap", "shooter_event"."post_position" FROM "shooter"
      JOIN "shooter_event" ON "shooter_event"."shooter_id" = "shooter"."id"
      WHERE "shooter_event"."event_id" = ${
        req.params.event_id
      } AND "shooter_event"."squad_id" IS NULL;`);
    //Returns event id and event name
    const getEventDetails = pool.query(
      `SELECT * FROM "event" WHERE "id" = ${req.params.event_id};`
    );
    //returns an array of squad objects made up of squad id, squad name, and array of squad members
    const getSquadDetails = pool.query(
      `SELECT json_agg(row_to_json(squ)) as squads
      FROM (
        SELECT sq."id", sq."name",
        (SELECT COALESCE(json_agg(sh), '[]'::json)
        FROM (
          SELECT "shooter"."id", "shooter"."first_name", "shooter"."last_name", "shooter"."handicap", "shooter_event"."post_position" FROM "shooter"
          JOIN "shooter_event" ON "shooter"."id" = "shooter_event"."shooter_id"
          JOIN "squad" ON "shooter_event"."squad_id" = "squad"."id"
          WHERE "squad"."id" = sq."id" AND "shooter_event"."event_id" = $1
          ORDER BY "shooter_event"."post_position"
        ) sh
      ) as members
      FROM "squad" as sq
      WHERE sq."event_id" = $1) squ
      ;`,
      [req.params.event_id]
    );

    //assemble contents of dataToSend from postgres responses
    const unsquaddedResults = await getUnsquadded;
    const eventDetailResults = await getEventDetails;
    const squadDetailResults = await getSquadDetails;

    // assembles response object from database results
    dataToSend = {
      event: {
        id: eventDetailResults.rows[0].id,
        name: eventDetailResults.rows[0].name,
      },
      unassigned: unsquaddedResults.rows,
      squads: [...squadDetailResults.rows[0].squads],
    };
  } catch (error) {
    console.log('Error getting squadding data: ' + error);
    res.sendStatus(500);
  }

  //send finished data object as response
  res.send(dataToSend);
});

/**
 * PUT to assign shooters to squads
 */
router.put('/:event_id', rejectUnauthenticated, (req, res) => {
  newSquadding = req.body;
  console.log('newSquadding:', newSquadding);

  let unassigned = { members: [...newSquadding.unassigned], id: null };
  let squadsToLoop = [...newSquadding.squads.slice(0), unassigned];

  let updateValues = [];
  //for each squad in req.body.squads:
  for (let squad of squadsToLoop) {
    //loop through squad.members
    //push (squad_id, calculated post_position from index within array, shooter_id, and event_id) to updateValues array for each squad member
    squad.members.forEach(member => {
      updateValues.push(
        `(${squad.id}, ${squad.members.indexOf(member) + 1}, ${member.id}, ${
          req.params.event_id
        })`
      );
    });
  }
  //update shooter_event table with new squad_id and post_position for each shooter_id/event_id pair
  pool
    .query(
      `
    UPDATE "shooter_event"
    SET "squad_id" = columns."squad_id",
      "post_position" = columns."post_position"
    FROM( VALUES
      ${updateValues.join(',')}
      ) as columns("squad_id", "post_position", "shooter_id", "event_id")
      WHERE columns."shooter_id" = "shooter_event"."shooter_id" AND columns."event_id" = "shooter_event"."event_id";
    `
    )
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log('Error updating shooter_event:', error);
      res.sendStatus(500);
    });
});

//Create a new squad in the database with four new squad_trap entries for each of the four boxes
router.post('/new/:event_id', rejectUnauthenticated, (req, res) => {
  let newSquadId;
  pool
    .query(
      `INSERT INTO "squad" ("event_id", "name")
              VALUES (${req.params.event_id}, DEFAULT)
              RETURNING "id";`
    )
    .then(results => {
      newSquadId = results.rows[0].id;
      pool
        .query(
          `INSERT INTO "squad_trap" ("squad_id", "box_number")
                  VALUES (${newSquadId}, 1),
                        (${newSquadId}, 2),
                        (${newSquadId}, 3),
                        (${newSquadId}, 4);`
        )
        .then(() => res.sendStatus(200));
    })
    .catch(error => {
      console.log('Error posting new squad:', error);
      res.sendStatus(500);
    });
});

router.delete('/squad/:id', async (req, res) => {
  squadToDeleteId = req.params.id;

  // unsquad the shooters in the squad
  await pool.query(
    `
      UPDATE "shooter_event"
      SET "squad_id" = null
      WHERE "squad_id" = $1;
    `,
    [squadToDeleteId]
  );

  // get the ids of the squad_traps associated with that trap
  let response = await pool.query(
    `
      SELECT "id" FROM "squad_trap"
      WHERE "squad_id" = $1;
      `,
    [squadToDeleteId]
  );
  let squadTrapIdsToClear = response.rows.map(row => row.id);

  // disassociate the scores associated with that trap
  let promises = squadTrapIdsToClear.map(squadTrapId => {
    return pool.query(
      `
          UPDATE "score"
          SET "squad_trap_id" = null
          WHERE "squad_trap_id" = $1;
        `,
      [squadTrapId]
    );
  });

  await Promise.all(promises);

  await pool.query(
    `
      DELETE FROM "squad_trap"
      WHERE "squad_id"=$1;
    `,
    [squadToDeleteId]
  );

  await pool
    .query(
      `
          DELETE FROM "squad"
          WHERE "id"=$1;
      `,
      [squadToDeleteId]
    )
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('Error deleting trap:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
