const express = require('express');
const pool = require("../../modules/pool");
const router = express.Router();
const { rejectUnauthenticated } = require('../../modules/authentication-middleware');

/**
 * GET a list of all traps from currently selected competition
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT "id", "name" FROM "trap"
                WHERE "competition_id" = ${req.user.competition_id};`)
      .then( results => res.send(results.rows))
      .catch( error => {
        console.log('Error getting trap list:', error);
        res.sendStatus(500);
      });
});

// Gets id and name of selected trap into the redux state (selectedTrap reducer) for the scoring view so it can be accessed in the selectedTrap array.

router.get('/:id', rejectUnauthenticated, (req, res) => {
  pool.query(`SELECT "id", "name" FROM "trap" WHERE "id" = $1;`, [req.params.id])
    .then(results => res.send(results.rows[0]))
    .catch(error => {
      console.log('Error getting competition details:', error);
      res.sendStatus(500);
    })
})

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;