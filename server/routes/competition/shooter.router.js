const express = require('express');
const pool = require('../../modules/pool');
const {
  rejectUnauthenticated,
} = require('../../modules/authentication-middleware');
const router = express.Router();

const routerName = 'shooter.router.js';

// GET a list of all shooters associated with a competition
router.get('/', rejectUnauthenticated, (req, res) => {
  pool
    .query(
      `SELECT "shooter"."id", "shooter"."first_name", "shooter"."last_name", "shooter"."handicap" FROM "shooter"
              JOIN "shooter_event" on "shooter"."id" = "shooter_event"."shooter_id"
              LEFT JOIN "event" ON "shooter_event"."event_id" = "event"."id"
              WHERE "event"."competition_id" = ${req.user.competition_id}
              GROUP BY "shooter"."id";`
    )
    .then(results => {
      res.send(results.rows);
    })
    .catch(error => {
      console.log(
        'Error getting shooter list from /api/competition/shooter',
        error
      );
      res.sendStatus(500);
    });
});

//  GET a single shooter's details by id
// TODO: also get all event and squad information associated with the shooter
router.get('/:id', rejectUnauthenticated, (req, res) => {
  pool
    .query(
      `SELECT "id", "first_name", "last_name", "email", "phone", "handicap", "ata_number" 
      FROM "shooter"
      WHERE "id" = ${req.params.id};`
    )
    .then(results => {
      res.send(results.rows);
    })
    .catch(error => {
      console.log(
        'Error getting shooter list from /api/competition/shooter',
        error
      );
      res.sendStatus(500);
    });
});

// PUT to edit an individual shooter's details by id
//TODO: add ability to update event and squad associations
router.put('/:id', rejectUnauthenticated, (req, res) => {
  pool
    .query(
      `UPDATE "shooter"
    SET "first_name" = $1, "last_name" = $2, "email" = $3, "phone" = $4, "handicap" = $5, "ata_number" = $6
    WHERE "id" = $7;`,
      [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.phone,
        req.body.handicap,
        req.body.ata_number,
        req.params.id,
      ]
    )
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log('Error updating shooter details:', error);
      res.sendStatus(500);
    });
});

router.delete('/:id', rejectUnauthenticated, async (req, res) => {
  let shooterToDeleteId = req.params.id;
  console.log('delete shooter hit:', shooterToDeleteId);

  // we will need to get all of the shooter_events,
  // delete all the scores that references those shooter events,
  // delete the shooter events,
  // then delete the shooter.

  // get all of the apllicable shooter_events
  let response = await pool
    .query(
      `
        SELECT "id" FROM "shooter_event"
        WHERE "shooter_id" = $1
      `,
      [shooterToDeleteId]
    )
    .catch(error => {
      console.log('### Problem in', routerName, '.');
      console.log('### Error:');
      console.log(error);
    });
  let shooterEventIdsToDelete = response.rows;

  // delete all the scores that reference those shooter_events
  let scorePromises = shooterEventIdsToDelete.map(current => {
    return pool.query(
      `
            DELETE FROM "score"
            WHERE "shooter_event_id" = $1;
          `,
      [current.id]
    );
  });
  await Promise.all(scorePromises).catch(error => {
    console.log('### Problem in', routerName, '.');
    console.log('### Error:');
    console.log(error);
  });
  // delete all of the shooter_events
  let shooterEventPromises = shooterEventIdsToDelete.map(current => {
    return pool.query(
      `
            DELETE FROM "shooter_event"
            WHERE "id" = $1;
          `,
      [current.id]
    );
  });
  await Promise.all(shooterEventPromises).catch(error => {
    console.log('### Problem in', routerName, '.');
    console.log('### Error:');
    console.log(error);
  });

  // delete the shooter
  await pool
    .query(
      `
      DELETE FROM "shooter"
      WHERE id = $1;
    `,
      [shooterToDeleteId]
    )
    .catch(error => {
      console.log('### Problem in', routerName, '.');
      console.log('### Error:');
      console.log(error);
    });

  res.sendStatus(200);
});

module.exports = router;
