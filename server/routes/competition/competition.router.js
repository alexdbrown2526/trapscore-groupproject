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
 * GET route template
 */
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "competition";`)
      .then((results) => res.send( results.rows ))
      .catch((error) => {
        console.log('Error getting from /competition', error)
        res.sendStatus(500);
      })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

/* Routes */
router.use('/shooter', shooterRouter);
router.use('/event', eventRouter);
router.use('/squad', squadRouter);
router.use('/trap', trapRouter);
router.use('/results', resultsRouter);


module.exports = router;