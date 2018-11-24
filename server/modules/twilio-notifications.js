const twilio = require("twilio");
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const pool = require("../modules/pool");

const sendTwilioNotification = (trap_id, place_in_line) => {
  //gets a list of next scheduled squads
  pool
    .query(
      `SELECT * FROM "squad_trap" 
        WHERE "trap_id" = ${trap_id}
          AND "place_in_line" >= ${place_in_line}
        ORDER BY "place_in_line"
        LIMIT 3;`
    )
    .then(results => {
      console.log("squad_trap list:", results.rows);
      if (results.rows[0].squad_id !== results.rows[results.rows.length - 1].squad_id && results.rows[1].squad_id !== results.rows[results.rows.length - 1].squad_id) {
        const squad_id = results.rows[results.rows.length - 1].squad_id;
        pool
          .query(`SELECT "shooter"."phone", "shooter"."first_name", "event"."name" as "event_name", "trap"."name" as "trap_name"
              FROM "shooter"
              JOIN "shooter_event" ON "shooter"."id" = "shooter_event"."shooter_id"
              JOIN "event" ON "shooter_event"."event_id" = "event"."id"
              JOIN "squad" ON "shooter_event"."squad_id" = "squad"."id"
              JOIN "squad_trap" ON "squad_trap"."squad_id" = "squad"."id"
              JOIN "trap" ON "squad_trap"."trap_id" = "trap"."id"
              WHERE "squad_trap"."squad_id" = ${squad_id} 
                AND "squad_trap"."trap_id" = ${trap_id}
                AND "squad_trap"."place_in_line" = ${results.rows[results.rows.length - 1].place_in_line};`)
          .then(results => {
            results.rows.forEach(shooter => {
              let body = `Hi, ${shooter.first_name}. Your squad is next in line to shoot ${shooter.event_name.toLowerCase()} at ${shooter.trap_name}`;
              console.log("message body:", body);
              //FYI: Twilio's concurrency limit is 100.
              client.messages
                .create({
                  from: process.env.TWILIO_NUMBER,
                  //adds US country code (+1) and strips all non digit characters before attempting to send
                  to: `+1${shooter.phone.toString().replace(/\D/g,'')}`,
                  body: body
                })
                .then(() => {
                  res.send({ success: true });
                })
                .catch(err => {
                  console.log(err);
                  res.send({ success: false });
                });
            });
          })
          .catch(error => {
            console.log('Error sending shooter notifications:', error);
            res.sendStatus(500);
          });
      } 
    });

  
};

module.exports = sendTwilioNotification;
