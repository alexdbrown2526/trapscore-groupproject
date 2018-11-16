const express = require("express");
const pool = require("../../modules/pool");
const router = express.Router();

/**
 * GET route template
 * TODO: should produce this object for a specific trap
 * {
  "trap": {
    "id": 0,
    "name": "",
  },
  "squad_trap": {
    "id": 0,
    "squad_id": 0,
    "trap_id": 0,
    "box_number": 0,
    "place_in_line" 0,
    "current_round": 0,
  },
  "shooters": [
    {
      "id": 32,
      "name": "Alex",
      "shooter_event_id": 75,
      "shots" : 
        [
          1,
          1,
          0,
          null,
          null
        ]
    },
    {
      "id": 38,
      "name": "Chris",
      "shooter_event_id": 61,
      "shots" :
        [
          1,
          1,
          null,
          null,
          null
        ]
    },
    ...
  ]
}
 */
router.get("/", async (req, res, next) => {
  //assumes that req.body.id is the trap id AND that the lowest value of 'place_in_line' is actually the next in line (i.e. when scores are submitted, place_in_line needs to be set to null)
  let selectedTrap;
  let squadTrap;
  let shooterList = [];
  let assembledResponse = {};
  try {
    //query trap * by id
    pool
      .query(`SELECT * FROM "trap" WHERE "id" = $1;`, [req.body.id])
      .then(results => selectedTrap = results.rows[0])
      .catch(error => next(error));
    //query squad_trap by trap id and assigns the row with lowest value of place_in_line to response object
    await pool
      .query(
        `SELECT * FROM "squad_trap" WHERE "trap_id" = $1 ORDER BY "place_in_line" ASC;`,
        [req.body.id]
      )
      .then(results => {
        //stores squad id for use by next query to get shooter list
        squad_trap_id = results.rows[0].id;
        squadTrap = results.rows[0];
      })
      .catch(error => next(error));
    //get shooter list for current round of shooting
    await pool
      .query(`SELECT 
                "shooter"."id" as "shooter_id", "shooter"."first_name", "shooter"."last_name",
                "shooter_event"."id" as "shooter_event_id"
              FROM "squad_trap"
              JOIN "squad" ON "squad_trap"."squad_id" = "squad"."id"
              JOIN "shooter_squad" ON "squad"."id" = "shooter_squad"."squad_id"
              JOIN "event" ON "squad"."event_id" = "event"."id"
              JOIN "shooter_event" ON "event"."id" = "shooter_event"."event_id"
              JOIN "shooter" ON "shooter_event"."shooter_id" = "shooter"."id" AND "shooter_squad"."shooter_id" = "shooter"."id"
              WHERE "squad_trap"."id" = $1;`, [squad_trap_id])
      .then(results => {
        shooterList = results.rows;
        //loop over each shooter, assigning empty score array for current round of shooting
        shooterList.forEach(shooter => {
          shooter.shots = [null, null, null, null, null];
        });
      })
      .catch(error => {
        next(error);
      });

    //assembles the response object from the three query results above
    assembledResponse = {
      trap: selectedTrap,
      squad_trap: squadTrap,
      shooters: shooterList
    };
    console.log('assembled response ready to send to client:', assembledResponse);

    res.send(assembledResponse);
  } catch (error) {
    console.log(
      "##Error assembling score object. More information below:",
      error
    );
    res.sendStatus(500);
  }
});

/**
 * POST route template
 */
router.post("/", (req, res) => {});

module.exports = router;
