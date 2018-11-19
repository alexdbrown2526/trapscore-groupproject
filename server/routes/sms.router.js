const express = require('express');
const router = express.Router();
const client = require('twilio')(
    process.env.TWILIO_ACCOUT_SID,
    process.env.TWILIO_AUTH_TOKEN,
    process.env.TWILIO_NUMBER,
    process.env.TWILIO_MESSAGING_SERVICE_SID,
    process.env.TWILIO_NOTIFY_SERVICE_SID,
    process.env.MY_NUMBER
  );
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` })); 
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: process.env.TWILIO_NUMBER,
      to: req.body.to,
      body: req.body.body
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });

});

module.exports = router;