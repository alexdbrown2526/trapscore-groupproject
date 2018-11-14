import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

//TrapScore Routes
import Nav from '../Nav/Nav';
import ViewAdminSelectCompetition from '../ViewAdminSelectCompetition/ViewAdminSelectCompetition';
import ViewAdminEditCompetition from '../ViewAdminEditCompetition/ViewAdminEditCompetition';
import CompetitionRoster from '../ViewCompetitionRoster/CompetitionRoster';
import Results from '../ViewResults/Results';
import Squadding from '../ViewSquadding/Squadding';
import Scheduling from '../ViewScheduling/Scheduling';
import Scoring from '../ViewScoring/Scoring';
import TrapSelection from '../ViewTrapSelection/TrapSelection';
import ShooterRegistration from '../ViewShooterRegistration/ShooterRegistration';

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
} from '../../navigationRoutes';

// Material-UI
import {
  CssBaseline,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core';
import { brown, green } from '@material-ui/core/colors/';

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
    this.props.dispatch({ type: 'FETCH_USER' });
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
              <Redirect exact from="/" to={rosterRoute} />
              {/* TrapScore Routes */}
              <ProtectedRoute
                exact
                path={selectCompetitionRoute}
                component={ViewAdminSelectCompetition}
              />
              <ProtectedRoute
                exact
                path={editCompetitionRoute}
                component={ViewAdminEditCompetition}
              />
              <ProtectedRoute
                exact
                path={rosterRoute}
                component={CompetitionRoster}
              />
              <ProtectedRoute exact path={resultsRoute} component={Results} />
              <ProtectedRoute
                exact
                path={squaddingRoute}
                component={Squadding}
              />
              <ProtectedRoute
                exact
                path={schedulingRoute}
                component={Scheduling}
              />
              <ProtectedRoute
                exact
                path={selectTrapRoute}
                component={TrapSelection}
              />
              <ProtectedRoute exact path={scoringRoute} component={Scoring} />
              <Route
                path={'/registration/:id&:hash'}
                component={ShooterRegistration}
              />
              {/* For protected routes, the view could show one of several things on the same route.

            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
              {/* <ProtectedRoute exact path="/home" component={UserPage} /> */}
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
