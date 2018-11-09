const twilio = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  const body = 'Ice creams are coming!';

// Code for sending out messages to multiple numbers
// const numbers = [My number, Someone else's number, etc]; 
// Uncomment this line ^^^^^^^
  Promise.all(
    numbers.map(number => {
      return twilio.messages.create({
        to: number,
        from: process.env.TWILIO_MESSAGING_SERVICE_SID,
        body: body
      });
    })
  )
    .then(messages => {
      console.log('Messages sent!');
    })
    .catch(err => console.error(err));

    