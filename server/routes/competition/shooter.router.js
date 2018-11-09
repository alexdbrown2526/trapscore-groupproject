const express = require('express');
const pool = require("../../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    pool.query(`INSERT INTO "shooter" ("first_name", "last_name", "email", "phone", "handicap", "ata_number")
    VALUES ($1, $2, $3, $4, $5, $6);`, [req.body.firstName, req.body.lastName, req.body.email, req.body.phone, req.body.handicap, req.body.ataNumber])
});

module.exports = router;