const express = require('express');
const pool = require('../../modules/pool');
const {
  rejectUnauthenticated,
} = require('../../modules/authentication-middleware');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  let promises = [];
  let dataToSend = {};
  try {
    promises.push(
      pool.query(
        `SELECT "squad_trap"."id", "squad_trap"."box_number", "squad"."name", "squad_trap"."place_in_line", "squad_trap"."squad_id" from "squad_trap"
                              LEFT JOIN "squad" on "squad"."id" = "squad_trap"."squad_id"
                              JOIN "event" on "event"."id" = "squad"."event_id"
                              WHERE "squad_trap"."trap_id" IS NULL
                              AND "event"."competition_id" = $1
                              ORDER BY "squad"."id", "squad_trap"."box_number";`,
        [req.user.competition_id]
      )
    );
    promises.push(
      pool.query(`SELECT json_agg(row_to_json(tra)) as traps
                              FROM (
                                SELECT tr."id", tr."name", tr."competition_id",
                                (SELECT COALESCE(json_agg(sq_tr), '[]'::json)
                                FROM (
                                  SELECT "squad_trap"."id", "squad_trap"."squad_id", "squad_trap"."box_number", "squad_trap"."place_in_line", "squad"."name" FROM "squad_trap"
                                  JOIN "squad" ON "squad"."id" = "squad_trap"."squad_id"
                                  JOIN "trap" ON "trap"."id" = "squad_trap"."trap_id"
                                  WHERE "squad_trap"."trap_id" = tr."id"
                                  AND "squad_trap"."place_in_line" IS NOT NULL
                                  ORDER BY "squad_trap"."place_in_line"
                                ) sq_tr
                              ) as schedule
                              FROM "trap" as tr
                              ORDER BY tr."id") tra
                              WHERE tra."competition_id" = ${
                                req.user.competition_id
                              };`)
    );
  } catch (error) {
    console.log(error);
  }

  Promise.all(promises).then(values => {
    let trapsValues = values[1].rows[0].traps || [];
    dataToSend = {
      unassigned: values[0].rows,
      traps: trapsValues,
    };
    res.send(dataToSend);
  });
});

/**
 * Changes a squad's trap_id and place_in_line from null to the correctly scheduled values
 */
router.put('/', rejectUnauthenticated, (req, res) => {
  let newSchedule = req.body;

  let unscheduled = { id: null, schedule: req.body.unassigned };
  let trapsToLoop = [...newSchedule.traps.slice(0), unscheduled];

  let updateValues = [];
  //loop through each trap within trapsToLoop array
  for (let trap of trapsToLoop) {
    //for each squad in a trap's schedule array, push '(place_in_line, trap_id, squad_id, and box_number)' to updateValues
    trap.schedule.forEach(item => {
      updateValues.push(
        `(${trap.schedule.indexOf(item) + 1}, ${trap.id}, ${item.squad_id}, ${
          item.box_number
        })`
      );
    });
  }

  //updates squad_trap data from the updateValues array data
  pool
    .query(
      `
      UPDATE "squad_trap"
      SET "place_in_line" = columns."place_in_line", 
        "trap_id" = columns."trap_id"
      FROM ( VALUES
        ${updateValues.join(',')}
      ) as columns("place_in_line", "trap_id", "squad_id", "box_number")
      WHERE "squad_trap"."squad_id" = columns."squad_id" AND "squad_trap"."box_number" = columns."box_number"
    ;`
    )
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('Error storing squad scheduling data:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
