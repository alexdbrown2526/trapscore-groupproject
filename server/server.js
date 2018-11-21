const express = require("express");
require("dotenv").config();

const app = express();
const bodyParser = require("body-parser");
const sessionMiddleware = require("./modules/session-middleware");

const passport = require("./strategies/user.strategy");

// Route includes
// ALL other routes are routed through competitionRouter. No need to add more here.
const userRouter = require("./routes/user.router");
const competitionRouter = require("./routes/competition/competition.router");
const registrationRouter = require("./routes/registration.router");


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
/* ALL OTHER COMPETITION_SPECIFIC ROUTES ARE ROUTED THROUGH THE COMPETITION ROUTER -- no need to add them here */
app.use("/api/registration", registrationRouter);
app.use("/api/user", userRouter);
app.use("/api/competition", competitionRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
