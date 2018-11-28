const express = require('express');
const router = express.Router();

/* sub-route requires */
const adminRouter = require('./admin.router');
const shooterRouter = require('./shooter.router');
const eventRouter = require('./event.router');
const squaddingRouter = require('./squadding.router');
const schedulingRouter = require('./scheduling.router');
const trapRouter = require('./trap.router');
const resultsRouter = require('./results.router');
const secretRouter = require('./secret.router');
const scoresRouter = require('./scores.router');
const editRouter = require('./edit.router');

/* sub-route uses */
router.use('/admin', adminRouter);
router.use('/shooter', shooterRouter);
router.use('/event', eventRouter);
router.use('/squadding', squaddingRouter);
router.use('/scheduling', schedulingRouter);
router.use('/trap', trapRouter);
router.use('/results', resultsRouter);
router.use('/secret', secretRouter);
router.use('/scores', scoresRouter);
router.use('/edit', editRouter);

module.exports = router;
