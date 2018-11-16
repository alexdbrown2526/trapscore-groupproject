const express = require('express');
const pool = require('../../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  let promises = [];
  let dataToSend = {};
  try {
    promises.push(
      pool.query(`SELECT * from "squad_trap"
                              LEFT JOIN "squad" on "squad"."id" = "squad_trap"."squad_id"
                              LEFT JOIN "trap" on "squad_trap"."trap_id" = "trap"."id"
                              WHERE "squad_trap"."place_in_line" IS NULL
                              AND "trap"."competition_id" = 1
                              ORDER BY "squad"."id", "squad_trap"."box_number";`)
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
                              WHERE tra."competition_id" = ${req.user.competition_id};`)
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
 * POST route template
 */
router.post('/', (req, res) => {});

module.exports = router;
