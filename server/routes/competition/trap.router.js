const express = require('express');
const pool = require("../../modules/pool");
const router = express.Router();

/**
 * GET a list of all traps from currently selected competition
 */
router.get('/', (req, res) => {
    pool.query(`SELECT "trap"."id", "trap"."name" FROM "trap" 
    JOIN "squad_trap" on "squad_trap"."trap_id" = "trap"."id"
    JOIN "squad" on "squad_trap"."squad_id" = "squad"."id"
    JOIN "event" on "squad"."event_id" = "event"."id"
    WHERE "event"."competition_id" = ${req.user.competition_id};`);
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;