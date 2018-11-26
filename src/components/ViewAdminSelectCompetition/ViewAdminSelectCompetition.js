import React, { Component } from 'react';
import axios from 'axios';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { LOGIN_ACTIONS } from '../../redux/actions/loginActions';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Button, List, ListItem, TextField } from '@material-ui/core/';

import { homeRoute } from '../../navigationRoutes';

import ViewAdminEditCompetition from '../ViewAdminEditCompetition/ViewAdminEditCompetition';
import { toast } from 'react-toastify';
import moment from 'moment';

const styles = theme => ({
  userDetail: {
    padding: 24,
    width: '100%',
  },
  contestDetail: {
    paddingLeft: 24,
    width: '100%',
  },
  list: {
    width: '50%',
    fontFamily: 'Roboto, sans-serif',
    borderStyle: 'solid',
    marginTop: '3%',
    paddingBottom: '1%',
    fontSize: '20px',
  },
  cancel: {
    color: 'red',
    float: 'right',
    marginRight: '2%',
  },
  logOutButton: {
    marginLeft: '3%',
  },

  editButton: {
    marginRight: '10%',
  },

  event: {
    backgroundColor: 'red',
  },
});

class ViewAdminSelectCompetition extends Component {
  state = {
    modalOpen: false,
    competitions: [],
    newCompetitionName: '',
    editCompetition: {
      id: '',
      name: '',
      location: '',
      date: moment(),
    },
  };

  refreshData = () => {
    axios({
      method: 'GET',
      url: '/api/competition',
    }).then(response => {
      let newCompetitions = [];
      for (let competition of response.data) {
        newCompetitions.push({
          ...competition,
          date: moment(competition.date),
        });
      }
      this.setState({
        ...this.state,
        competitions: newCompetitions,
      });
    });
  };

  componentDidMount() {
    this.refreshData();
  }

  handleChangeFor = propertyName => event => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value,
    });
  };

  handleEditChangeFor = propertyName => event => {
    this.setState({
      editCompetition: {
        ...this.state.editCompetition,
        [propertyName]: event.target.value,
      },
    });
  };

  handleDateChange = date => {
    this.setState({
      editCompetition: {
        ...this.state.editCompetition,
        date: date,
      },
    });
  };

  editCompetition = selectedCompetition => {
    this.setState({
      editCompetition: {
        ...selectedCompetition,
        date: moment(selectedCompetition.date),
      },
    });
    this.handleOpen();
  };
  // Conditional Rendering for Log out
  handleLogOut = event => {
    event.preventDefault();
    this.props.dispatch({ type: LOGIN_ACTIONS.LOGOUT });
    this.props.history.push(homeRoute);
  };

  submitEdits = event => {
    event.preventDefault();
    const body = this.state.editCompetition;

    axios({
      method: 'PUT',
      url: `/api/competition`,
      data: body,
    }).then(response => {
      this.setState({
        ...this.state,
        editCompetition: {
          id: '',
          name: '',
          location: '',
          date: moment(),
          defaultPassword: '',
          newPassword: '',
        },
      });
      this.refreshData();
      toast('Competition Submitted!');
    });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  addCompetition = () => {
    // reject blank input
    if (this.state.newCompetitionName === '') {
      alert('Please input a competition name.');
      return false;
    } else {
      axios({
        method: 'POST',
        url: '/api/competition',
        data: { name: this.state.newCompetitionName },
      })
        .then(response => {
          this.editCompetition(response.data);
        })
        .catch(error => {
          alert(
            'Something went wrong adding the competition. Are you sure the name is unique?'
          );
          console.log('Error:', error);
        });
    }
  };

  deleteCompetition = competitionIdToDelete => {
    axios({
      method: 'DELETE',
      url: `/api/competition/${competitionIdToDelete}`,
    })
      .then(response => {
        this.refreshData();
      })
      .catch(error => {
        alert('Something went wrong deleting the competition.');
        console.log('Error:', error);
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <center>
        <div className={classes.list}>
          <h1>Select Competition</h1>
          <List>
            {this.state.competitions.map(comp => {
              return (
                <ListItem key={comp.id} value={comp.id}>
                  <Button
                    className={classes.editButton}
                    variant="contained"
                    color="secondary"
                    onClick={() => this.editCompetition(comp)}
                  >
                    Edit
                  </Button>
                  {comp.name}
                </ListItem>
              );
            })}
            <ListItem>
              <Button
                className={classes.editButton}
                variant="contained"
                color="primary"
                onClick={this.addCompetition}
              >
                Add
              </Button>
              <TextField
                label="New competition name"
                value={this.state.newCompetitionName}
                onChange={this.handleChange('newCompetitionName')}
                margin="normal"
              />
            </ListItem>

            <Button
              className={classes.logOutButton}
              color="secondary"
              variant="contained"
              onClick={this.handleLogOut}
            >
              Log Out
            </Button>
          </List>
          <ViewAdminEditCompetition
            open={this.state.modalOpen}
            handleClose={this.handleClose}
            submitEdits={this.submitEdits}
            editCompetition={this.state.editCompetition}
            handleEditChangeFor={this.handleEditChangeFor}
            handleDateChange={this.handleDateChange}
          />
        </div>
      </center>
    );
  }
}

ViewAdminSelectCompetition.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({
  reduxState,
});

export default compose(
  connect(mapStateToProps),
  withRouter,
  withStyles(styles)
)(ViewAdminSelectCompetition);
