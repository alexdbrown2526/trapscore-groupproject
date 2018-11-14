const express = require("express");
const pool = require("../modules/pool");

const router = express.Router();

const routerName = "registration.router.js";

/**
 * GET route template
 */
router.get(`/:id&:hash`, (req, res) => {
  let toTry = {
    id: req.params.id,
    hash: req.params.hash,
  };
  console.log("trying:", toTry);
  pool
    .query(
      `
      SELECT
        "competition".*,
        json_agg("event") as "events"
      FROM "competition"
      JOIN "event" ON "event"."competition_id" = "competition"."id"
      WHERE "competition"."id" = $1 AND "secret_url" = $2
      GROUP BY "competition"."id";
  `,
      [toTry.id, toTry.hash]
    )
    .then(results => {
      if (results.rows.length > 0) {
        res.send(results.rows[0]);
      } else {
        res.sendStatus(403);
      }
    })
    .catch(error => {
      console.log("### Error in file:", routerName);
      console.log("### Error verifying registration page secret url:");
      console.log(error);
    });
});

/**
 * POST route template
 */
router.post(`/:id&:hash`, (req, res) => {
  let toTry = {
    id: req.params.id,
    hash: req.params.hash,
  };
  console.log("trying:", toTry);
  console.log("body:", req.body);

  pool
    .query(
      `
  SELECT * FROM "competition"
  WHERE "id" = $1 AND "secret_url" = $2;
`,
      [toTry.id, toTry.hash]
    )
    .then(results => {
      if (results.rows.length > 0) {
        console.log("successfully verified.");
        // insert code goes here
        res.sendStatus(200);
      } else {
        res.sendStatus(403);
      }
    })
    .catch(error => {
      console.log("### Error in file:", routerName);
      console.log("### Error verifying registration page secret url:");
      console.log(error);
    });
});

module.exports = router;
