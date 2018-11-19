const express = require("express");
const pool = require("../../modules/pool");
const { rejectUnauthenticated } = require('../../modules/authentication-middleware');
const router = express.Router();

// GET the secret url for a specific competition
router.get("/", rejectUnauthenticated, (req, res) => {
  pool
    .query(
      `SELECT "secret_url", "id" FROM "competition" WHERE "id" = ${
        req.user.competition_id
      }`
    )
    .then(results => res.send(results.rows))
    .catch(error => {
      console.log("Error getting events from /api/competition/event", error);
      res.sendStatus(500);
    });
});

module.exports = router;
