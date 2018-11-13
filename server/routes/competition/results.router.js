const express = require("express");
const pool = require("../../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  // let competition_id = req.user.competition_id;
  let competition_id = 1;
  let toSend = [];

  // Get a list of all of the events for the specific competition
  pool
    .query(
      `
      SELECT
        *
      FROM "event"
      WHERE "competition_id" = $1;
    `,
      [competition_id]
    )
    .then(results => {
      toSend = results.rows;
      let promises = [];
      // loop through the events and get the participants and their results
      // TODO: ensure these are in order?
      for (let currentEvent of toSend) {
        promises.push(
          pool
            .query(
              `
                SELECT
                  "shooter"."first_name",
                  "shooter"."last_name",
                  SUM("score"."score") AS "total_hits",
                  COUNT("score") AS "total_shots",
                  json_agg("score") AS "raw_scores"
                FROM "event"
                JOIN "shooter_event" ON "event"."id" = "shooter_event"."event_id"
                  JOIN "score" ON "shooter_event"."id" = "score"."shooter_event_id"
                  JOIN "shooter" ON "shooter_event"."shooter_id" = "shooter"."id"
                WHERE "event_id" = $1
                GROUP BY "event"."id", "shooter"."id"
                ORDER BY "total_hits" DESC
                ;
            `,
              [currentEvent.id]
            )
            .then(results => {
              currentEvent.results = results.rows;
            })
        );
      }

      Promise.all(promises).then(() => {
        res.send(toSend);
      });
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {});

module.exports = router;
