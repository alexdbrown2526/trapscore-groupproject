import React, { Component } from "react";
import axios from "axios";

import { compose } from "redux";
import { withRouter } from "react-router-dom";

import { LOGIN_ACTIONS } from "../../redux/actions/loginActions";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Button, List, ListItem, TextField } from "@material-ui/core/";

import { homeRoute } from "../../navigationRoutes";

import ViewAdminEditCompetition from "../ViewAdminEditCompetition/ViewAdminEditCompetition";
import { toast } from "react-toastify";
import moment from "moment";

const styles = theme => ({
  list: {
    width: "50%",
    fontFamily: "Roboto, sans-serif",
    borderStyle: "solid",
    marginTop: "3%",
    paddingBottom: "1%",
    fontSize: "20px"
  },
  editButton: {
    marginRight: theme.spacing.unit * 4
  }
});

class ViewAdminSelectCompetition extends Component {
  state = {
    modalOpen: false,
    competitions: [],
    newCompetitionName: "",
    competitionToEdit: {
      id: "",
      name: "",
      location: "",
      date: moment()
    }
  };

  componentDidMount() {
    this.getCompetitions();
  }

  // Create a competition, axios 'POST' with name of the competition
  addCompetition = () => {
    // reject blank input
    if (this.state.newCompetitionName === "") {
      alert("Please input a competition name.");
      return false;
    } else {
      axios({
        method: "POST",
        url: "/api/competition",
        data: { name: this.state.newCompetitionName }
      })
        .then(response => {
          this.editCompetition(response.data);
        })
        .catch(error => {
          alert(
            "Something went wrong adding the competition. Are you sure the name is unique?"
          );
          console.log("Error:", error);
        });
    }
  };

  // Gets a list of all competitions
  getCompetitions = () => {
    axios({
      method: "GET",
      url: "/api/competition"
    }).then(response => {
      let newCompetitions = response.data.map(competition => {
        return {
          ...competition,
          date: moment(competition.date)
        };
      });
      this.setState({
        ...this.state,
        competitions: newCompetitions
      });
    });
  };

  // (stage update)
  stageEdit = selectedCompetition => {
    this.setState({
      competitionToEdit: {
        ...selectedCompetition,
        date: moment(selectedCompetition.date)
      }
    });
    this.handleOpen();
  };

  // Update competition, axios 'PUT', sets state to edited info.
  editCompetition = event => {
    event.preventDefault();
    const body = this.state.competitionToEdit;

    axios({
      method: "PUT",
      url: `/api/competition`,
      data: body
    }).then(response => {
      this.setState({
        ...this.state,
        competitionToEdit: {
          id: "",
          name: "",
          location: "",
          date: moment(),
          defaultPassword: "",
          newPassword: ""
        }
      });
      this.getCompetitions();
      toast("Competition Updated!");
    });
  };

  // Delete, passed as props to ViewAdminEditCompetition
  deleteCompetition = competitionIdToDelete => {
    axios({
      method: "DELETE",
      url: `/api/competition/${competitionIdToDelete}`
    })
      .then(response => {
        this.getCompetitions();
      })
      .catch(error => {
        alert("Something went wrong deleting the competition.");
        console.log("Error:", error);
      });
  };
  // For creating a competition, passed as props to ViewAdminEditCompetition
  handleChangeFor = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  // For editing competition information, passed as props to ViewAdminEditCompetition
  handleEditChangeFor = propertyName => event => {
    this.setState({
      competitionToEdit: {
        ...this.state.competitionToEdit,
        [propertyName]: event.target.value
      }
    });
  };
  // For react-datepicker, passed as props to ViewAdminEditCompetition
  handleDateChange = date => {
    this.setState({
      competitionToEdit: {
        ...this.state.competitionToEdit,
        date: date
      }
    });
  };
  // Log Out
  handleLogOut = event => {
    event.preventDefault();
    this.props.dispatch({ type: LOGIN_ACTIONS.LOGOUT });
    this.props.history.push(homeRoute);
  };
  // Modal Close
  handleClose = () => {
    this.setState({ modalOpen: false });
  };
  // Modal Open
  handleOpen = () => {
    this.setState({ modalOpen: true });
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
                    onClick={() => this.stageEdit(comp)}
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
                onChange={this.handleChangeFor("newCompetitionName")}
                margin="normal"
              />
            </ListItem>

            <Button
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
            editCompetition={this.editCompetition}
            competitionToEdit={this.state.competitionToEdit}
            handleEditChangeFor={this.handleEditChangeFor}
            handleDateChange={this.handleDateChange}
          />
        </div>
      </center>
    );
  }
}

ViewAdminSelectCompetition.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(ViewAdminSelectCompetition);
