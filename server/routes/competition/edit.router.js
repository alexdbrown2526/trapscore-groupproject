const express = require('express');
const pool = require('../../modules/pool');
const {
  rejectUnauthenticated,
} = require('../../modules/authentication-middleware');
const router = express.Router();

router.put('/squad/:id', rejectUnauthenticated, (req, res) => {
  console.log(req.body.name, req.params.id);
  pool
    .query(
      `UPDATE "squad"
      SET "name" = $1
      WHERE "id" = $2;`,
      [req.body.name, req.params.id]
    )
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log('Error updating details:', error);
      res.sendStatus(500);
    });
});

router.put('/trap/:id', rejectUnauthenticated, (req, res) => {
  console.log(req.body.name, req.params.id);
  pool
    .query(
      `UPDATE "trap"
        SET "name" = $1
        WHERE "id" = $2;`,
      [req.body.name, req.params.id]
    )
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log('Error updating details:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
