const express = require('express');
const pool = require('../../modules/pool');
const { rejectUnauthenticated } = require('../../modules/authentication-middleware');
const router = express.Router();

/**
 * GET a list of all UNSQUADDED shooters for a specific event
 * TODO: add another query to get individual squad lists and format the response
 */
router.get('/:event_id', rejectUnauthenticated, async (req, res) => {
  console.log('event_id:', req.params.event_id);
  let dataToSend = {};
  try {
    //Returns an array of all unsquadded shooters associated with the currently selected event
    const getUnsquadded = pool.query(`SELECT "shooter"."id", "shooter"."first_name", "shooter"."last_name", "shooter"."handicap", "shooter_event"."post_position" FROM "shooter"
      JOIN "shooter_event" ON "shooter_event"."shooter_id" = "shooter"."id"
      WHERE "shooter_event"."event_id" = ${req.params.event_id} AND "shooter_event"."squad_id" IS NULL;`);
    //Returns event id and event name
    const getEventDetails = pool.query(
      `SELECT * FROM "event" WHERE "id" = ${req.params.event_id};`
    );
    //returns an array of squad objects made up of squad id, squad name, and array of squad members
    const getSquadDetails = pool.query(`SELECT json_agg(row_to_json(squ)) as squads
      FROM (
        SELECT sq."id", sq."name",
        (SELECT COALESCE(json_agg(sh), '[]'::json)
        FROM (
          SELECT "shooter"."id", "shooter"."first_name", "shooter"."last_name", "shooter"."handicap", "shooter_event"."post_position" FROM "shooter"
          JOIN "shooter_event" ON "shooter"."id" = "shooter_event"."shooter_id"
          JOIN "squad" ON "shooter_event"."squad_id" = "squad"."id"
          WHERE "squad"."id" = sq."id" AND "shooter_event"."event_id" = ${
            req.params.event_id
          }
          ORDER BY "shooter_event"."post_position"
        ) sh
      ) as members
      FROM "squad" as sq
      WHERE sq."event_id" = ${req.params.event_id}) squ
      ;`);

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
  
  let updateValues = [];
  //for each squad in req.body.squads:
  for (let squad of req.body.squads) {
    //loop through squad.members
    //push (squad_id, calculated post_position from index within array, shooter_id, and event_id) to updateValues array for each squad member
    squad.members.forEach(member => {
      updateValues.push(`(${squad.id}, ${squad.members.indexOf(member) + 1}, ${member.id}, ${req.params.event_id})`);
    })
  }
  //update shooter_event table with new squad_id and post_position for each shooter_id/event_id pair
  pool
    .query(`
    UPDATE "shooter_event"
    SET "squad_id" = columns."squad_id",
      "post_position" = columns."post_position"
    FROM( VALUES
      ${updateValues.join(",")}
      ) as columns("squad_id", "post_position", "shooter_id", "event_id")
      WHERE columns."shooter_id" = "shooter_event"."shooter_id" AND columns."event_id" = "shooter_event"."event_id";
    `)
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log("Error updating shooter_event:", error);
      res.sendStatus(500);
    });
});

module.exports = router;
