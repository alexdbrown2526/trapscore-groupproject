const toScore25 = require("./score.dummyFeed");
const pool = require("./server/modules/pool");
const fs = require("fs");
const squadinfo = require("./squadinfo");

for (toScore of squadinfo) {
  // toScore.fullScore = 0;
  let shooterAccuracy = getRandomInt(101);
  for (i = 0; i < 25; i++) {
    let thisScore = 0;
    let currentShot = getRandomInt(101);
    if (currentShot < shooterAccuracy) {
      thisScore = 1;
    }
    console.log(
      "(" +
        toScore.squad_trap_id +
        "," +
        toScore.shooter_event_id +
        "," +
        thisScore +
        "),"
    );
    // toScore.fullScore += thisScore;
  }
}

for (toScore of squadinfo) {
  console.log(toScore.fullScore);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//DO NOT DELETE
// function getSquadInfo() {
//   pool
//     .query(
//       `
// SELECT
// "squad_trap"."id" as "squad_trap_id",
// "shooter_event"."id" as "shooter_event_id" FROM "squad_trap"
// JOIN "squad" ON "squad_trap"."squad_id" = "squad"."id"
// JOIN "event" ON "squad"."event_id" = "event"."id"
// JOIN "shooter_event" ON "event"."id" = "shooter_event"."event_id" AND "shooter_event"."squad_id" = "squad"."id"
// JOIN "shooter" ON "shooter_event"."shooter_id" = "shooter"."id"
// WHERE "event"."id" < 4
// ORDER BY "shooter_event"."id"
// ;
// `
//     )
//     .then(results => {
//       console.log(results.rows);
//       fs.writeFile("squadinfo.js", JSON.stringify(results.rows), err => {
//         console.log("Error writing file", err);
//       });
//     });
//   return;
// }

getSquadInfo();
