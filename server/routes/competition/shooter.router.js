const express = require('express');
const pool = require("../../modules/pool");
const router = express.Router();


// GET a list of all shooters associated with a competition
router.get('/', (req, res) => {
  pool
    .query(`SELECT "shooter"."id", "shooter"."first_name", "shooter"."last_name", "shooter"."handicap" FROM "shooter"
              JOIN "shooter_event" on "shooter"."id" = "shooter_event"."shooter_id"
              LEFT JOIN "event" ON "shooter_event"."event_id" = "event"."id"
              WHERE "event"."competition_id" = ${req.user.competition_id}
              GROUP BY "shooter"."id";`)
    .then(results => {
      console.log(results.rows);
      res.send(results.rows);
    })
    .catch(error => {
      console.log("Error getting shooter list from /api/competition/shooter", error);
      res.sendStatus(500);
    });
});

//  GET a single shooter's details by id
// TODO: also get all event and squad information associated with the shooter
router.get("/:id", (req, res) => {
  pool.query(
      `SELECT "first_name", "last_name", "email", "phone", "handicap", "ata_number" 
      FROM "shooter"
      WHERE "id" = ${req.params.id};`
    )
    .then(results => {
      console.log(results.rows);
      res.send(results.rows);
    })
    .catch(error => {
      console.log( "Error getting shooter list from /api/competition/shooter", error );
      res.sendStatus(500);
    });
});

// PUT to edit an individual shooter's details by id
//TODO: add ability to update event and squad associations
router.put("/:id", (req, res) => {
  pool.query(`UPDATE "shooter"
    SET "first_name" = $1, "last_name" = $2, "email" = $3, "phone" = $4, "handicap" = $5, "ata_number" = $6
    WHERE "id" = $7;`, [req.body.first_name, req.body.last_name, req.body.email, req.body.handicap, req.body.ata_number, req.params.id]
    )
    .then( () => res.sendStatus(200)
    )
    .catch( error => {
      console.log('Error updating shooter details:', error);
      res.sendStatus(500);
    });
})

/**
 * POST a new shooter 
 */
router.post('/', (req, res) => {
    pool.query(`INSERT INTO "shooter" ("first_name", "last_name", "email", "phone", "handicap", "ata_number")
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING "id";`, [req.body.firstName, req.body.lastName, req.body.email, req.body.phone, req.body.handicap, req.body.ataNumber])
      // TODO after we know how event data is coming in from client
      // .then(results => {
      //   pool.query(`INSERT INTO "shooter_event" ("event_id", "shooter_id")
      //               VALUES ($1, $2)`)
      // })
      .then(() => res.sendStatus(200))
      .catch(error => {
        console.log('Error posting new shooter:', error);
        res.sendStatus(500);
      })
});



module.exports = router;