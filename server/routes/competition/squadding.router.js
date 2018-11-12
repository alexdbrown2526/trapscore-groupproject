const express = require("express");
const pool = require("../../modules/pool");
const router = express.Router();

/**
 * GET a list of all UNSQUADDED shooters for a specific event
 * TODO: add another query to get individual squad lists and format the response
 */
router.get("/:event_id", async (req, res) => {
  let dataToSend = {
    event: {},
    unsquadded: [],
    squads: []
  };

  //Returns an array of all unsquadded shooters associated with the currently selected event
  pool.query(
      `SELECT "shooter"."id", "shooter"."first_name", "shooter"."last_name", "shooter"."handicap" FROM "shooter"
              JOIN "shooter_event" ON "shooter_event"."shooter_id" = "shooter"."id"
              WHERE "shooter_event"."event_id" = ${req.params.event_id}
              EXCEPT
              SELECT "shooter"."id", "shooter"."first_name", "shooter"."last_name", "shooter"."handicap" FROM "shooter"
              JOIN "shooter_squad" ON "shooter_squad"."shooter_id" = "shooter"."id";`
    )
    .then(results => {
      //assign the array of unsquadded shooters to the dataToSend object
      dataToSend.unsquadded = results.rows;
      //Returns event id and name
      pool.query(`SELECT * FROM "event" WHERE "id" = ${req.params.event_id}`)
        .then(results => {
          //assign event id and name to dataToSend object
          dataToSend.event = {
            id: results.rows[0].id,
            name: results.rows[0].name,
          };
          //Returns an array of objects that each include squad id, squad name, and an array of shooter members assigned to that squad ordered by post position
          pool.query(`
            SELECT json_agg(row_to_json(squ)) as squads
            FROM (
              SELECT sq."id", sq."name",
              (SELECT json_agg(sh)
              FROM (
                SELECT "shooter"."id", "shooter"."first_name", "shooter"."last_name", "shooter"."handicap", "shooter_squad"."post_position" FROM "shooter"
                JOIN "shooter_squad" ON "shooter"."id" = "shooter_squad"."shooter_id"
                JOIN "squad" ON "shooter_squad"."squad_id" = "squad"."id"
                WHERE "squad"."id" = sq."id"
                ORDER BY "shooter_squad"."post_position"
              ) sh
            ) as members
            FROM "squad" as sq) squ;
          `)
            .then( results => {
              //assigns the squads array to the dataToSend object
              dataToSend = {...dataToSend, squads: [...results.rows[0].squads]};
              //sends the complete dataToSend object to the client
              res.send(dataToSend);
            })
        })
    })
    .catch(error => {
      console.log("Error getting event data:", error);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {});

module.exports = router;

[
  {
    id: 1,
    name: "squad 1",
    shooters: [
      {
        id: 2,
        first_name: "Deanna",
        last_name: "Bradshaw",
        handicap: 2,
        post_position: 1
      },
      {
        id: 23,
        first_name: "Maia",
        last_name: "Santos",
        handicap: 66,
        post_position: 2
      },
      {
        id: 42,
        first_name: "Herman",
        last_name: "Chen",
        handicap: 49,
        post_position: 4
      }
    ]
  },
  {
    id: 2,
    name: "squad 2",
    shooters: [
      {
        id: 7,
        first_name: "Reese",
        last_name: "Cervantes",
        handicap: 72,
        post_position: 1
      },
      {
        id: 11,
        first_name: "Melyssa",
        last_name: "Guthrie",
        handicap: 47,
        post_position: 5
      }
    ]
  },
  { id: 3, name: "squad 3", shooters: null },
  { id: 4, name: "squad 4", shooters: null },
  { id: 5, name: "squad 5", shooters: null },
  { id: 6, name: "squad 6", shooters: null },
  { id: 7, name: "squad 7", shooters: null },
  { id: 8, name: "squad 8", shooters: null },
  { id: 9, name: "squad 9", shooters: null }
];
