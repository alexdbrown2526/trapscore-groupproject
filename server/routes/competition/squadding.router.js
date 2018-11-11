const express = require('express');
const pool = require("../../modules/pool");
const router = express.Router();

/**
 * GET a list of all UNSQUADDED shooters for a specific event
 * TODO: add another query to get individual squad lists and format the response
 */
router.get('/:event_id', (req, res) => {
  pool.query(`SELECT "shooter"."id", "shooter"."first_name", "shooter"."last_name", "shooter"."handicap" FROM "shooter"
              JOIN "shooter_event" ON "shooter_event"."shooter_id" = "shooter"."id"
              WHERE "shooter_event"."event_id" = ${req.params.event_id}
              EXCEPT
              SELECT "shooter"."id", "shooter"."first_name", "shooter"."last_name", "shooter"."handicap" FROM "shooter"
              JOIN "shooter_squad" ON "shooter_squad"."shooter_id" = "shooter"."id";`)
    .then( results => res.send(results.rows))
    .catch( error => {
      console.log('Error getting event data:', error);
      res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;