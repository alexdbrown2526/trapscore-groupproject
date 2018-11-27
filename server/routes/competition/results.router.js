const express = require('express');
const pool = require('../../modules/pool');
const copyTo = require('pg-copy-streams').to;
const {
  rejectUnauthenticated,
} = require('../../modules/authentication-middleware');
const router = express.Router();

const routerName = 'results.router.js';

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  let competition_id = req.user.competition_id;
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
            .catch(error => {
              console.log('### Error in:', routerName);
              console.log(
                '### Error getting scores for event with id:',
                currentEvent.id
              );
              console.log(error);
            })
        );
      }

      Promise.all(promises).then(() => {
        res.send(toSend);
      });
    })
    .catch(error => {
      console.log('### Error in:', routerName);
      console.log(
        '### Error getting events for competition with id:',
        competition_id
      );
      console.log(error);
    });
});

router.get('/export', rejectUnauthenticated, (req, res) => {
  const compId = req.user.competition_id;
  pool.connect(function(err, client, done) {
    if (err) {
      console.log('error exporting csv:', err);
      res.sendStatus(500);
    }
    const stream = client.query(
      copyTo(`
    COPY (
      SELECT 
        "shooter"."first_name" as "First Name", 
        "shooter"."last_name" as "Last Name", 
        "shooter"."email" as "Email", 
        "shooter"."phone" as "Phone", 
        "shooter"."handicap" as "Handicap", 
        "shooter"."ata_number" as "ATA Number", 
        "event"."name" as "Event", 
        SUM("score"."score") as "Score" 
      FROM "shooter"
        JOIN "shooter_event" ON "shooter"."id" = "shooter_event"."shooter_id"
        JOIN "event" ON "shooter_event"."event_id" = "event"."id"
        JOIN "score" ON "shooter_event"."id" = "score"."shooter_event_id"
      WHERE "event"."competition_id" = ${compId}
      GROUP BY "shooter"."id", "event"."id"
    ) 
    TO STDOUT WITH (FORMAT csv, HEADER true);
    `)
    );
    stream.pipe(res);
    stream.on('end', done);
    stream.on('error', done);
  });
});

// .then(results => {
//   res.send(results.rows);
// })
// .catch(error => {
//   console.log("Error exporting competition scores summary CSV file", error);
//   res.sendStatus(500);
// });
// })

module.exports = router;
