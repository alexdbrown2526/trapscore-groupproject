const express = require('express');
const pool = require("../../modules/pool");
const router = express.Router();

/**
 * GET a list of all traps from currently selected competition
 */
router.get('/', (req, res) => {
    pool.query(`SELECT "id", "name" FROM "trap"
                WHERE "competition_id" = ${req.user.competition_id};`)
      .then( results => res.send(results.rows))
      .catch( error => {
        console.log('Error getting trap list:', error);
        res.sendStatus(500);
      });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;