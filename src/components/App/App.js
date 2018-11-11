import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { connect } from "react-redux";

import Nav from "../Nav/Nav";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import UserPage from "../UserPage/UserPage";
// import AboutPage from "../AboutPage/AboutPage";
// import InfoPage from "../InfoPage/InfoPage";

//TrapScore Routes
import SelectCompetition from "../CompetitionAdmin/SelectCompetition";
import EditCompetition from "../CompetitionAdmin/EditCompetition";
import ShooterRegistration from "../ShooterRegistration/ShooterRegistration";
import CompetitionRoster from "../CompetitionRoster/CompetitionRoster";
import Results from "../Results/Results";
import Squadding from "../Squadding/Squadding";
import Scheduling from "../Scheduling/Scheduling";
import Scoring from "../Scoring/Scoring";
import TrapSelection from "../TrapSelection/TrapSelection";

import {
  selectCompetitionRoute,
  editCompetitionRoute,
  rosterRoute,
  squaddingRoute,
  schedulingRoute,
  selectTrapRoute,
  scoringRoute,
  registrationRoute,
  resultsRoute,
} from "../../navigationRoutes";

// Material-UI
import {
  CssBaseline,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core";
import { brown, green } from "@material-ui/core/colors/";

const theme = createMuiTheme({
  palette: {
    primary: brown,
    secondary: green,
  },
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_USER" });
  }

  render() {
    return (
      <Router>
        <div>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Nav />
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />
              {/* TrapScore Routes */}
              <Route
                exact
                path={selectCompetitionRoute}
                component={SelectCompetition}
              />
              <Route
                exact
                path={editCompetitionRoute}
                component={EditCompetition}
              />
              <Route exact path={rosterRoute} component={CompetitionRoster} />
              <Route exact path={resultsRoute} component={Results} />
              <Route exact path={squaddingRoute} component={Squadding} />
              <Route exact path={schedulingRoute} component={Scheduling} />
              <Route exact path={selectTrapRoute} component={TrapSelection} />
              <Route exact path={scoringRoute} component={Scoring} />
              <Route
                exact
                path={registrationRoute}
                component={ShooterRegistration}
              />
              {/* For protected routes, the view could show one of several things on the same route.

            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
              <ProtectedRoute exact path="/home" component={UserPage} />
              {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </MuiThemeProvider>
        </div>
      </Router>
    );
  }
}

export default connect()(App);
