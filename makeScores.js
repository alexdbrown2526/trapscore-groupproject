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
