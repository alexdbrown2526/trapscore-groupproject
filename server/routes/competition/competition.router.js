const express = require('express');
const pool = require('../../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../../modules/authentication-middleware');
const encryptLib = require('../../modules/encryption');

/* sub-route requires */
const shooterRouter = require('./shooter.router');
const eventRouter = require('./event.router');
const squaddingRouter = require('./squadding.router');
const schedulingRouter = require('./scheduling.router');
const trapRouter = require('./trap.router');
const resultsRouter = require('./results.router');
const secretRouter = require('./secret.router');
const scoresRouter = require('./scores.router');
const editRouter = require('./edit.router');

/**
 * GET list of all competitions
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log(
    'User is logged in with competition ID=',
    req.user.competition_id
  );
  pool
    .query(`SELECT * FROM "competition" ORDER BY "isActive" DESC, "date" ASC;`)
    .then(results => res.send(results.rows))
    .catch(error => {
      console.log('Error getting from /competition', error);
      res.sendStatus(500);
    });
});

/**
 * create a new competition with default values
 * returns id of new competition as results.rows
 */
router.post('/', rejectUnauthenticated, async (req, res) => {
  // create the new competition
  let results = await pool
    .query(`INSERT INTO "competition" DEFAULT VALUES RETURNING *;`)
    .catch(error => {
      console.log('Error creating new competition:', error);
      res.sendStatus(500);
    });

  let competitionId = results.rows[0].id;
  console.log('Competition ID:', competitionId);

  // set the secret url for that competition
  let secretUrl = encryptLib.encryptPassword(String(competitionId));

  await pool
    .query(
      `
      UPDATE "competition"
      SET "secret_url" = $1
      WHERE "id" = $2;
    `,
      [secretUrl, competitionId]
    )
    .catch(error => {
      console.log('Error setting secret url:', error);
      res.sendStatus(500);
    });

  let results2 = await pool
    .query(
      `
      SELECT * FROM "competition"
      WHERE "id" = $1;
    `,
      [competitionId]
    )
    .catch(error => {
      console.log('Error getting new competition details:', error);
      res.sendStatus(500);
    });
  console.log(results2.rows[0]);
  res.send(results2.rows[0]);
});

// update an existing competition's name, location, and/or date
router.put('/', rejectUnauthenticated, (req, res) => {
  pool
    .query(
      `UPDATE "competition" SET "name" = $1, "location" = $2, "date"=$3
              WHERE "id" = $4;`,
      [req.body.name, req.body.location, req.body.date, req.body.id]
    )
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log('Error updating competition:', error);
      res.sendStatus(500);
    });
});

/* sub-route uses */
router.use('/shooter', shooterRouter);
router.use('/event', eventRouter);
router.use('/squadding', squaddingRouter);
router.use('/scheduling', schedulingRouter);
router.use('/trap', trapRouter);
router.use('/results', resultsRouter);
router.use('/secret', secretRouter);
router.use('/scores', scoresRouter);
router.use('/edit', editRouter);

//GET a single competition by ID
router.get('/:id', rejectUnauthenticated, (req, res) => {
  pool
    .query(`SELECT * FROM "competition" WHERE "id" = $1;`, [req.params.id])
    .then(results => res.send(results.rows))
    .catch(error => {
      console.log('Error getting competition details:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
