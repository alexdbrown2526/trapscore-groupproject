const express = require('express');
const pool = require("../../modules/pool");
const router = express.Router();

// Gets a list of all shooters associated with a competition
// TODO: also get all event and squad information associated with each shooter object
// router.get('/', (req, res) => {
//   pool.query(`SELECT "shooter"."id", "shooter"."first_name", "shooter"."last_name", "shooter"."email", "shooter"."phone", "shooter"."handicap", "shooter"."ata_number" FROM "shooter"
//               JOIN "shooter_event" on "shooter"."id" = "shooter_event"."shooter_id"
//               JOIN "event" ON "shooter_event"."event_id" = "event"."id"
//               JOIN "competition" ON "competition"."id" = "event"."competition_id"
//               WHERE "competition_id" = ${req.user.competition_id};`)
//     .then((results) => {
//       console.log(results.rows);
//       res.send(results.rows);
//     })
//     .catch((error) => {
//       console.log('Error getting shooter list from /api/competition/shooter', error);
//       res.sendStatus(500);
//     })
// });

/**
 * POST route template
 */
router.post('/', (req, res) => {
    pool.query(`INSERT INTO "shooter" ("first_name", "last_name", "email", "phone", "handicap", "ata_number")
    VALUES ($1, $2, $3, $4, $5, $6);`, [req.body.firstName, req.body.lastName, req.body.email, req.body.phone, req.body.handicap, req.body.ataNumber])
});

router.get('/', (req,res) => {
  pool.query(`SELECT * FROM "shooter"`)
  .then((results) => {
    res.send(results.rows)
  })
})

module.exports = router;