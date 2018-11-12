const express = require('express');
const pool = require('../../modules/pool');
const router = express.Router();

/* sub-route requires */
const shooterRouter = require('./shooter.router');
const eventRouter = require('./event.router');
const squaddingRouter = require('./squadding.router');
const schedulingRouter = require('./scheduling.router');
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

// update an existing competition's name, location, and/or date
router.put('/', (req, res) => {
  pool.query(`UPDATE "competition" SET "name" = $1, "location" = $2, "date"=$3
              WHERE "id" = $4;`, [req.body.name, req.body.location, req.body.date, req.body.id])
    .then(() => res.sendStatus(200))
    .catch( error => {
      console.log('Error updating competition:', error);
      res.sendStatus(500);
    })
})

/* sub-route uses */
router.use('/shooter', shooterRouter);
router.use('/event', eventRouter);
router.use('/squadding', squaddingRouter);
router.use('/scheduling', schedulingRouter);
router.use('/trap', trapRouter);
router.use('/results', resultsRouter);


module.exports = router;