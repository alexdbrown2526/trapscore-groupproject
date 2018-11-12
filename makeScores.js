const toScore25 = require("./score.dummyFeed");

for (toScore of toScore25) {
  for (i = 0; i < 25; i++) {
    console.log(
      "(" +
        toScore.squad_trap_id +
        "," +
        toScore.shooter_event_id +
        "," +
        getRandomInt(2) +
        "),"
    );
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
