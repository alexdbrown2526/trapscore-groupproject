const express = require('express');
const pool = require('../../modules/pool');
const { rejectUnauthenticated } = require('../../modules/authentication-middleware');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  let promises = [];
  let dataToSend = {};
  try {
    promises.push(
      pool.query(`SELECT "squad_trap"."id", "squad_trap"."box_number", "squad"."name", "squad_trap"."place_in_line", "squad_trap"."squad_id" from "squad_trap"
                              LEFT JOIN "squad" on "squad"."id" = "squad_trap"."squad_id"
                              JOIN "event" on "event"."id" = "squad"."event_id"
                              WHERE "squad_trap"."trap_id" IS NULL
                              AND "event"."competition_id" = $1
                              ORDER BY "squad"."id", "squad_trap"."box_number";`, [req.user.competition_id])
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
                              FROM "trap" as tr) tra
                              WHERE tra."competition_id" = ${
                                req.user.competition_id
                              };`)
    );
  } catch (error) {
    console.log(error);
  }

  Promise.all(promises).then(values => {
    console.log(values);
    dataToSend = {
      unassigned: values[0].rows,
      traps: values[1].rows[0].traps,
    };
    console.log('dataToSend: ', dataToSend);
    res.send(dataToSend);
  });
});

/**
 * Changes a squad's trap_id and place_in_line from null to the correctly scheduled values
 */
router.put('/', (req, res) => {
  let newSchedule = req.body;

  let unscheduled = { id: null, schedule: [] }
  let trapsToLoop = [...req.body.traps, ]


  let updateValues = [];

  
  pool
    .query(`
      UPDATE "squad_trap"
      SET "place_in_line" = $1, "trap_id" = $2
      WHERE "squad_id" = $3 AND "box_number" = $4
      RETURNING *
    ;`, [req.body.place_in_line, req.body.trap_id, req.params.squad_id, req.body.box_number]
    )
    .then(results => {
      res.send(results.rows);
    })
    .catch(error => {
      console.log('Error storing squad scheduling data:', error);
      res.sendStatus(500);
    })

});

module.exports = router;
