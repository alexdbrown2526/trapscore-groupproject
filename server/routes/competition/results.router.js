const express = require("express");
const pool = require("../../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  console.log("Results router hit");
  console.log(req.user);
  let competition_id = req.user.competition_id;
  console.log(competition_id);
  const toSend = "cool";

  res.send(toSend);
});

/**
 * POST route template
 */
router.post("/", (req, res) => {});

module.exports = router;
