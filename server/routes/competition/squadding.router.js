const express = require("express");
const pool = require("../../modules/pool");
const router = express.Router();

/**
 * GET a list of all UNSQUADDED shooters for a specific event
 * TODO: add another query to get individual squad lists and format the response
 */
router.get("/:event_id", async (req, res) => {
  let dataToSend = {};
  try {
    //Returns an array of all unsquadded shooters associated with the currently selected event
    const unsquaddedResults = await pool.query(
      `SELECT "shooter"."id", "shooter"."first_name", "shooter"."last_name", "shooter"."handicap" FROM "shooter"
      JOIN "shooter_event" ON "shooter_event"."shooter_id" = "shooter"."id"
      WHERE "shooter_event"."event_id" = ${req.params.event_id}
      EXCEPT
      SELECT "shooter"."id", "shooter"."first_name", "shooter"."last_name", "shooter"."handicap" FROM "shooter"
      JOIN "shooter_squad" ON "shooter_squad"."shooter_id" = "shooter"."id";`
      );
    const eventDetailResults = await pool.query(
      `SELECT * FROM "event" WHERE "id" = ${req.params.event_id};`
      );
    const squadDetailResults = await pool.query(
      `SELECT json_agg(row_to_json(squ)) as squads
      FROM (
        SELECT sq."id", sq."name",
        (SELECT json_agg(sh)
        FROM (
          SELECT "shooter"."id", "shooter"."first_name", "shooter"."last_name", "shooter"."handicap", "shooter_squad"."post_position" FROM "shooter"
          JOIN "shooter_squad" ON "shooter"."id" = "shooter_squad"."shooter_id"
          JOIN "squad" ON "shooter_squad"."squad_id" = "squad"."id"
          WHERE "squad"."id" = sq."id"
          ORDER BY "shooter_squad"."post_position"
        ) sh
      ) as members
      FROM "squad" as sq) squ;`
    );
    
    // assembles response object from database results
    dataToSend = {
      event: {
        id: eventDetailResults.rows[0].id,
        name: eventDetailResults.rows[0].name,
      },
      unsquadded: unsquaddedResults.rows,
      squads: [...squadDetailResults.rows[0].squads]
    };
  } catch ( error ) {
    console.log('Error getting squadding data: ' + error );
    res.sendStatus(500);
  }
  
  //send finished data object as response
  res.send(dataToSend);
  
});

/**
 * POST route template
 */
router.post("/", (req, res) => {});

module.exports = router;
