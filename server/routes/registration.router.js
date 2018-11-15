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
 * POST route to add shooter information to shooter table and event data to shooter_event table
 */
router.post(`/:id&:hash`, (req, res) => {
  let toTry = {
    id: req.params.id,
    hash: req.params.hash,
  };
  console.log("trying:", toTry);
  console.log("body:", req.body);
  let newShooterId;
  const eventsFromClient = req.body.competition.events;
  let selectedEventData = [];
  //pseudo-authenticates before posting data
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
        console.log('/api/competition/:id$:hash POST body:', req.body);
        //posts new shooter data from registration form into "shooter" table and returns the newly created ID
        pool.query(`INSERT INTO "shooter" ("first_name", "last_name", "email", "phone", "handicap", "ata_number")
                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING "id";`, 
                    [req.body.first_name, req.body.last_name, req.body.email, req.body.phone, req.body.handicap, req.body.ata_number]
          ).then(results => {
            //assigns returned ID from previous query to newShooterId variable
            newShooterId = results.rows[0].id;
            console.log('new shooter id returned from post:', newShooterId);
            console.log('events from client:', eventsFromClient)
            //for each event marked as checked: 'true', push a pair of values to the selectedEventData array, 
            //then join them into a single comma separated string as VALUES for insert to shooter_event
            eventsFromClient.forEach((ev) => {
              if (ev.checked) {
              selectedEventData.push(`(${ev.id}, ${newShooterId})`);
              }
            })
            //Inserts formatted values data into shooter_event
            pool.query(`INSERT INTO "shooter_event" ("event_id", "shooter_id")
                       VALUES ${selectedEventData.join(',')};`)
              .then(() => {
                res.sendStatus(200);
              })
              .catch(error => {
                console.log('Error inserting shooter event data:', error);
                res.sendStatus(500);
              })
          }).catch(error => {
            console.log('Error posting shooter data:', error);
            res.sendStatus(500);
          })
          
          

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
