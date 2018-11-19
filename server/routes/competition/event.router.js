const express = require('express');
const pool = require("../../modules/pool");
const { rejectUnauthenticated } = require('../../modules/authentication-middleware');
const router = express.Router();

// GET a list of all events associated with current competition
router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM "event" WHERE "competition_id" = ${req.user.competition_id}`)
      .then(results => res.send(results.rows))
      .catch(error => {
        console.log('Error getting events from /api/competition/event', error);
        res.sendStatus(500);
      })
});

// GET a list of all events associated with current competition
router.get('/:comp_id', rejectUnauthenticated, (req, res) => {
  pool.query(`SELECT * FROM "event" WHERE "competition_id" = ${req.params.comp_id}`)
    .then(results => res.send(results.rows))
    .catch(error => {
      console.log('Error getting events from /api/competition/event', error);
      res.sendStatus(500);
    })
});

module.exports = router;