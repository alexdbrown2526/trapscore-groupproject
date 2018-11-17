const express = require('express');
const pool = require('../../modules/pool');
const router = express.Router();

/**
 * GET a list of all UNSQUADDED shooters for a specific event
 * TODO: add another query to get individual squad lists and format the response
 */
router.get('/:event_id', async (req, res) => {
  console.log('event_id:', req.params.event_id);
  let dataToSend = {};
  try {
    //Returns an array of all unsquadded shooters associated with the currently selected event
    const getUnsquadded = pool.query(
      `SELECT "shooter"."id", "shooter"."first_name", "shooter"."last_name", "shooter"."handicap" FROM "shooter"
      JOIN "shooter_event" ON "shooter_event"."shooter_id" = "shooter"."id"
      WHERE "shooter_event"."event_id" = ${req.params.event_id} AND "shooter_event"."squad_id" IS NULL;`
    );
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
 * POST to reassign squad members to individual squads
 */
router.put('/:event_id', (req, res) => {
  newSquadding = req.body;
  console.log('newSquadding:', newSquadding);

  // loop through all of the unsquadded shooters and make sure they're
});

module.exports = router;
