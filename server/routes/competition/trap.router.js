const express = require('express');
const pool = require('../../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../../modules/authentication-middleware');

/**
 * GET a list of all traps from currently selected competition
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  pool
    .query(
      `SELECT "id", "name" FROM "trap"
                WHERE "competition_id" = ${req.user.competition_id};`
    )
    .then(results => res.send(results.rows))
    .catch(error => {
      console.log('Error getting trap list:', error);
      res.sendStatus(500);
    });
});

// Gets id and name of selected trap into the redux state (selectedTrap reducer) for the scoring view so it can be accessed in the selectedTrap array.

router.get('/:id', rejectUnauthenticated, (req, res) => {
  pool
    .query(`SELECT "id", "name" FROM "trap" WHERE "id" = $1;`, [req.params.id])
    .then(results => res.send(results.rows[0]))
    .catch(error => {
      console.log('Error getting competition details:', error);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/new/', rejectUnauthenticated, (req, res) => {
  pool
    .query(
      `
    INSERT INTO "trap" ("name", "competition_id")
    VALUES ('New Trap', $1);
  `,
      [req.user.competition_id]
    )
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('Error creating new trap:', error);
      res.sendStatus(500);
    });
});

router.delete('/:id', rejectUnauthenticated, async (req, res) => {
  await pool.query(
    `
      UPDATE "squad_trap"
      SET "trap_id" = null
      WHERE "trap_id" = $1;
      `,
    [req.params.id]
  );

  pool
    .query(
      `
      DELETE FROM "trap"
      WHERE "id"=$1;
  `,
      [req.params.id]
    )
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('Error deleting trap:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
