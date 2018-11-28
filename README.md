# TrapScore

TrapScore is a full-stack web application for managing trap shooting competitions. It provides an interface for registering, squadding, scheduling, judging, and viewing and exporting results. It provides automated text updates to participants to help them get to their trap on time.

## Getting Started

### Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)
- [Postico](https://eggerapps.at/postico/) (or similar)

### Local copy

Clone and/or fork the repo so that you have your own copy on your local machine.

### Create database and tables

Create a new PostgreSQL database called `trap_score`. Open a SQL query within your new database. Locate the `database.sql` file within the project root, copy the contents into the query, and run it.

If you would like to use the provided test data, locate the `testData.sql` file and follow the same process.

#### Twilio API Setup

To enable automated SMS messaging functionality, you will need to create an account with [Twilio](https://www.twilio.com). Then, create or add a valid phone number to your account and copy your account SID and auth token into a .env file (see development setup instructions below, or visit https://www.twilio.com/docs/sms/quickstart/node for more details)

## Development Setup Instructions

- open Terminal and navigate to the project folder
- Run `npm install`
- Create a `.env` file at the root of the project and paste the following lines into the file:

```
    SERVER_SESSION_SECRET=superDuperSecret
    TWILIO_ACCOUNT_SID=(copy this from your Twilio account)
    TWILIO_AUTH_TOKEN=(copy from Twilio account)
    TWILIO_NUMBER=+15551234567 (replace with your Twilio number beginning with '+1' and no parentheses or dashes)
    REACT_APP_ROOT_URL="http://localhost:3000/"
```

While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/)

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

[[Do we give instructions about creating a user account?]]

## Deployment

### Prepare production build

Before pushing to Heroku, run the `npm run build` script in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5000`

### Push to Heroku

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico or a PostgreSQL client of your choice
1. Create the necessary tables using the scripts found in `database.sql`
1. Add environment variables for:
   - `SERVER_SESSION_SECRET`
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_NUMBER`
   - `REACT_APP_ROOT_URL` - put the root url from your heroku domain or custom domain here (for example, http://www.trapscore.com). DO NOT ADD A TRAILING SLASH.
1. In the deploy section, select manual deploy

## Built With

- [React](https://reactjs.org/) - Front End Web Framework
- [React Redux](https://react-redux.js.org/) - State Container
- [Node.js](https://nodejs.org/) - Server Runtime Environment
- [Express](https://expressjs.com/) - Back End Framework
- [PostgreSQL](https://www.postgresql.org/) - Database
- [React-Router](https://reacttraining.com/react-router/) - Client-side Routing
- [Twilio API](https://www.twilio.com) - Used for automating SMS notifications
- [React-Table](https://react-table.js.org/) - Used to display score results details
- [React-Beautiful-Dnd](https://github.com/atlassian/react-beautiful-dnd) - Used for assigning squads and scheduling
- [React-Toastify](https://fkhadra.github.io/react-toastify/) - Used for toast notifications
- ...for a full list of dependencies, see `package.json`

## Authors

- Alex Brown - _Initial Work_ - [alexdbrown2526](https://github.com/alexdbrown2526)
- Joseph Carey - _Initial Work_ - [josephcarey](https://github.com/josephcarey)
- Christopher Brenberg - _Initial Work_ - [cbrenberg](https://github.com/cbrenberg)
- Bobby Rosson - _Initial Work_ - [brdrummer](https://github.com/brdrummer)

## Acknowledgements

- Prime Digital Academy - https://primeacademy.io/
- Sawyer Mathiesen
- Luke Schlangen - [LukeSchlangen](https://github.com/LukeSchlangen)
