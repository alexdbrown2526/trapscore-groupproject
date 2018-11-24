import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { withStyles } from "@material-ui/core/styles";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { LOGIN_ACTIONS } from '../../redux/actions/loginActions';

//TrapScore Routes
import Nav from '../Nav/Nav';
import ViewAdminSelectCompetition from '../ViewAdminSelectCompetition/ViewAdminSelectCompetition';
import ViewAdminEditCompetition from '../ViewAdminEditCompetition/ViewAdminEditCompetition';
import ViewCompetitionRoster from '../ViewCompetitionRoster/ViewCompetitionRoster';
import ViewResults from '../ViewResults/ViewResults';
import ViewSquadding from '../ViewSquadding/ViewSquadding';
import ViewScheduling from '../ViewScheduling/ViewScheduling';
import Scoring from '../ViewScoring/ViewScoring';
import TrapSelection from '../ViewTrapSelection/TrapSelection';
import ViewShooterRegistration from '../ViewShooterRegistration/ViewShooterRegistration';

import {
  selectCompetitionRoute,
  editCompetitionRoute,
  rosterRoute,
  squaddingRoute,
  schedulingRoute,
  selectTrapRoute,
  scoringRoute,
  resultsRoute,
} from '../../navigationRoutes';

// Material-UI
import {
  CssBaseline,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#d84315',},
    secondary: { main: '#205723',},
  },
  typography: {
    useNextVariants: true,
  },
});

const styles = {
  darkToast: {
    backgroundColor: "rgba(30,30,30,.9)",
    color: "white",
    textAlign: "center",
    fontFamily: "Roboto, sans-serif"
  }
}

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: LOGIN_ACTIONS.FETCH_USER });
  }

  render() {
    const { classes } = this.props;
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
                component={ViewCompetitionRoster}
              />
              <ProtectedRoute
                exact
                path={resultsRoute}
                component={ViewResults}
              />
              <ProtectedRoute
                exact
                path={squaddingRoute}
                component={ViewSquadding}
              />
              <ProtectedRoute
                exact
                path={schedulingRoute}
                component={ViewScheduling}
              />
              <ProtectedRoute
                exact
                path={selectTrapRoute}
                component={TrapSelection}
              />
              <ProtectedRoute exact path={scoringRoute} component={Scoring} />
              <Route
                path={'/registration/:id&:hash'}
                component={ViewShooterRegistration}
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
          <ToastContainer
            position={toast.POSITION.BOTTOM_RIGHT}
            toastClassName={classes.darkToast}
            transition={Slide}
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover />
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(connect()(App));
