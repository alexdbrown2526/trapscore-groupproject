const toScore25 = require("./score.dummyFeed");

for (toScore of toScore25) {
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

// for (toScore of toScore25) {
//   console.log(toScore.fullScore);
// }

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/* DO NOT DELETE

SELECT 
  "squad_trap"."id" as "squad_trap_id",
  "shooter_event"."id" as "shooter_event_id" FROM "squad_trap"
JOIN "squad" ON "squad_trap"."squad_id" = "squad"."id"
JOIN "shooter_squad" ON "squad"."id" = "shooter_squad"."squad_id"
JOIN "event" ON "squad"."event_id" = "event"."id" 
JOIN "shooter_event" ON "event"."id" = "shooter_event"."event_id"
JOIN "shooter" ON "shooter_event"."shooter_id" = "shooter"."id" AND "shooter_squad"."shooter_id" = "shooter"."id"
;

*/
