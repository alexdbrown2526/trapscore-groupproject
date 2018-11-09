const express = require('express');
const pool = require('../../modules/pool');
const router = express.Router();

// sub-route includes
const shooterRouter = require('./shooter.router');
const eventRouter = require('./event.router');
const squadRouter = require('./squad.router');
const trapRouter = require('./trap.router');
const resultsRouter = require('./results.router');

/**
 * GET list of all competitions
 */
router.get('/', (req, res) => {
  pool.query(`SELECT * FROM "competition";`)
    .then(results => res.send( results.rows ))
    .catch((error) => {
      console.log('Error getting from /competition', error);
      res.sendStatus(500);
    })
});

/**
 * create a new competition with default values
 * returns id of new competition as results.rows
 */
router.post('/', (req, res) => {
  pool.query(`INSERT INTO "competition" DEFAULT VALUES RETURNING "id";`)
    .then((results) => {
      console.log('ID of new competition:', results.rows);
      res.send(results.rows);
    })
    .catch(error => {
      console.log('Error creating new competition', error);
      res.sendStatus(500);
    })
});

/* Routes */
router.use('/shooter', shooterRouter);
router.use('/event', eventRouter);
router.use('/squad', squadRouter);
router.use('/trap', trapRouter);
router.use('/results', resultsRouter);


module.exports = router;