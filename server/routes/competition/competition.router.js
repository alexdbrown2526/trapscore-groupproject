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

const routerName = 'competition.router.js';

getCompetitionStaffName = competitionName => {
  return competitionName
    .toLowerCase()
    .split(' ')
    .join('');
};

getCompetitionStaffPassword = competitionName => {
  let toEncrypt = getCompetitionStaffName(competitionName) + '-admin';
  return encryptLib.encryptPassword(toEncrypt);
};

/**
 * GET list of all competitions
 */
router.get('/', rejectUnauthenticated, (req, res) => {
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
    .query(`INSERT INTO "competition" ("name") VALUES ($1) RETURNING *;`, [
      req.body.name,
    ])
    .catch(error => {
      console.log('Error creating new competition:', error);
      res.sendStatus(500);
    });

  let newCompetitionInfo = results.rows[0];
  console.log('Competition ID:', newCompetitionInfo.id);

  // set the secret url for that competition
  let secretUrl = encryptLib.encryptPassword(String(newCompetitionInfo.id));

  await pool
    .query(
      `
      UPDATE "competition"
      SET "secret_url" = $1
      WHERE "id" = $2;
    `,
      [secretUrl, newCompetitionInfo.id]
    )
    .catch(error => {
      console.log('Error setting secret url:', error);
      res.sendStatus(500);
    });

  // create the staff user for that account
  const username = getCompetitionStaffName(newCompetitionInfo.name);
  const password = getCompetitionStaffPassword(newCompetitionInfo.name);

  const queryText =
    'INSERT INTO person (username, password, competition_id) VALUES ($1, $2, $3) RETURNING id';
  await pool
    .query(queryText, [username, password, newCompetitionInfo.id])
    .catch(error => {
      console.log('error:', error);
    });

  // create events for that competition; for now, just give it the defaults
  let results2 = await pool.query(
    `
      INSERT INTO "event" ("name", "competition_id")
      VALUES
        ('Singles', $1),
        ('Handicap', $1),
        ('Doubles', $1)
        RETURNING "id"
        ;
    `,
    [newCompetitionInfo.id]
  );

  let eventIds = results2.rows.map(row => {
    return row.id;
  });

  let defaultSquadPromises = eventIds.map(id => {
    return pool.query(
      `
        INSERT INTO "squad" ("name", "event_id")
        VALUES ($1, $2);
      `,
      ['Squad ' + id, id]
    );
  });

  await Promise.all(defaultSquadPromises);

  await pool.query(
    `
      INSERT INTO "trap" ("name", "competition_id")
      VALUES ('Trap 1', $1)
    `,
    [newCompetitionInfo.id]
  );

  // get the information to send back to the client
  let results3 = await pool
    .query(
      `
      SELECT * FROM "competition"
      WHERE "id" = $1;
    `,
      [newCompetitionInfo.id]
    )
    .catch(error => {
      console.log('Error getting new competition details:', error);
      res.sendStatus(500);
    });
  console.log(results3.rows[0]);
  res.send(results3.rows[0]);
});

// update an existing competition's name, location, and/or date
router.put('/', rejectUnauthenticated, async (req, res) => {
  results = await pool
    .query(
      `UPDATE "competition" SET "name" = $1, "location" = $2, "date"=$3
              WHERE "id" = $4
              RETURNING *;`,
      [req.body.name, req.body.location, req.body.date, req.body.id]
    )
    .catch(error => {
      console.log('Error updating competition:', error);
      res.sendStatus(500);
    });

  updatedCompetition = results.rows[0];

  await pool
    .query(
      `
        UPDATE "person"
        SET "username" = $1, "password" = $2
        WHERE "competition_id" = $3;
      `,
      [
        getCompetitionStaffName(updatedCompetition.name),
        getCompetitionStaffPassword(updatedCompetition.name),
        updatedCompetition.id,
      ]
    )
    .catch(error => {
      console.log('### Error in router:', routerName);
      console.log('### Error:');
      console.log(error);
      res.sendStatus(500);
    });

  res.sendStatus(201);
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

router.delete('/:id', rejectUnauthenticated, async (req, res) => {
  // Delete just orphans shooters, it doesn't delete them
  // this is because we believe eventually people will want to
  // be able to select a shooter to register instead of typing them new
  let competitionIdToDelete = req.params.id;

  // delete everything associated with that competition,
  // starting deep in foreign keys and working our way out
  try {
    // scores
    await pool.query(
      `
        DELETE FROM "score"
        USING "squad_trap", "trap"
        WHERE "score"."squad_trap_id" = "squad_trap"."id"
        AND "squad_trap"."trap_id" = "trap"."id"
        AND "trap"."competition_id" = $1;
      `,
      [competitionIdToDelete]
    );

    // squad_traps
    await pool.query(
      `
        DELETE FROM "squad_trap"
        USING "trap"
        WHERE "squad_trap"."trap_id" = "trap"."id"
        AND "trap"."competition_id" = $1;
      `,
      [competitionIdToDelete]
    );

    // traps
    await pool.query(
      `
        DELETE FROM "trap"
        WHERE "trap"."competition_id" = $1;
      `,
      [competitionIdToDelete]
    );

    // shooter_events
    await pool.query(
      `
        DELETE FROM "shooter_event"
        USING "event"
        WHERE "shooter_event"."event_id" = "event"."id"
        AND "event"."competition_id" = $1;
      `,
      [competitionIdToDelete]
    );

    // squads
    await pool.query(
      `
        DELETE FROM "squad"
        USING "event"
        WHERE "squad"."event_id" = "event"."id"
        AND "event"."competition_id" = $1;
      `,
      [competitionIdToDelete]
    );

    // events
    await pool.query(
      `
        DELETE FROM "event"
        WHERE "event"."competition_id" = $1;
      `,
      [competitionIdToDelete]
    );

    // person
    await pool.query(
      `
        DELETE FROM "person"
        WHERE "person"."competition_id" = $1;
      `,
      [competitionIdToDelete]
    );

    // competition
    await pool.query(
      `
        DELETE FROM "competition"
        WHERE "id" = $1;
      `,
      [competitionIdToDelete]
    );

    console.log('Competition deleted.');
    res.sendStatus(200);
  } catch (error) {
    console.log('### Something went wrong deleting a competition.');
    console.log('### Error:');
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
