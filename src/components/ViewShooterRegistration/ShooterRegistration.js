import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Button, Card, Checkbox, TextField } from "@material-ui/core/";

import "./ShooterRegistration.css";

const styles = {
  registerCard: {
    paddingBottom: "3%",
    paddingTop: "3%",
    position: "relative",
    zIndex: 1,
    display: "flex",
    overflow: "hidden",
    backfaceVisibility: "hidden",
    flexDirection: "column",
    margin: "0 auto",
    maxWidth: 260,
    border: 0,
    borderRadius: 2,
    // boxShadow: "0 3px 4px 0 fade(brown, 14%),
    //           0 3px 3px -3px fade(rgb(59, 41, 41), 20%),
    //           0 2px 8px 0 fade(brown, 12%)",
  },
  Checkbox: {
    listStyle: "none",
  },
};

class ShooterRegistration extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    phone: Number,
    handicap: Number,
    ata_number: Number,
    //array of event IDs from checkboxes.
    competition: {
      events: [],
    },
  };

  componentDidMount() {
    this.tryToGetCompetition();
    // axios({
    //   method: "GET",
    //   url: `/api/competition/event`,
    // }).then(response => {
    //   console.log(response);

    //   let eventsList;

    //   if (response.data) {
    //     eventsList = response.data.map(event => ({
    //       id: event.id,
    //       name: event.name,
    //       checked: false,
    //     }));
    //   } else {
    //     eventsList = [];
    //   }
    //   this.setState({ ...this.state, eventsList: eventsList });
    // });
  }

  tryToGetCompetition = () => {
    let toTry = {
      id: this.props.match.params.id,
      hash: this.props.match.params.hash,
    };
    console.log("trying:", toTry);
    axios({
      method: "GET",
      url: `/api/registration/${toTry.id}&${toTry.hash}`,
    }).then(response => {
      console.log(response.data);
      this.setState({ competition: response.data });
    });
  };

  registerShooter = event => {
    event.preventDefault();
    const body = this.state;
    let toTry = {
      id: this.props.match.params.id,
      hash: this.props.match.params.hash,
    };

    if (this.state.handicap < 16) {
      alert("You must choose a number between 16 and 27");
      return false;
    } else if (this.state.handicap > 27) {
      alert("You must choose a number between 16 and 27");
      return false;
    }

    axios({
      method: "POST",
      url: `/api/registration/${toTry.id}&${toTry.hash}`,
      data: body,
    }).then(response => {
        console.log('Registration successful!', response);
        this.setState({
            first_name: "",
            last_name: "",
            email: "",
            phone: Number,
            handicap: Number,
            ata_number: Number,
            //array of event IDs from checkboxes.
            competition: {
                events: [],
            },
        });
        this.tryToGetCompetition();
    }).catch( error => {
        console.log('Error submitting registration:', error);
        alert('Error submitting registration. Please try again');
    });

    // axios({
    //   method: "POST",
    //   url: "/api/competition/shooter",
    //   data: body,
    // }).then(() => {
    //   this.setState({
    //     first_name: "",
    //     last_name: "",
    //     email: "",
    //     phone: Number,
    //     handicap: Number,
    //     ata_number: Number,
    //     //array of event IDs from checkboxes.
    //     eventsList: [],
    //   });
    // });
  };

  handleChangeFor = propertyName => event => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value,
    });
  };

  handleChangeCheckBox = (event, checked) => {
    //event.target.value is the event ID
    //find the index in this.state.eventsList from the eventID
    let indexOfCheckedItem = this.state.competition.events.findIndex(
      item => item.id === parseInt(event.target.value)
    );

    this.setState({
      ...this.state,
      competition: {
        ...this.state.competition,
        events: [
          ...this.state.competition.events.slice(0, indexOfCheckedItem),
          {
            ...this.state.competition.events[indexOfCheckedItem],
            checked: checked,
          },
          ...this.state.competition.events.slice(indexOfCheckedItem + 1),
        ],
      },
    });

    // this.setState({
    //   ...this.state,
    //   eventsList: [
    //     ...this.state.eventsList.slice(0, indexOfCheckedItem),
    //     {
    //       ...this.state.eventsList[indexOfCheckedItem],
    //       checked: checked,
    //     },
    //     ...this.state.eventsList.slice(indexOfCheckedItem + 1),
    //   ],
    // });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.registerCard}>
          <center>
            <form onSubmit={this.registerShooter}>
              <h1>Shooter Registration</h1>
              <div>
                <TextField
                  placeholder="First Name"
                  type="text"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.handleChangeFor("first_name")}
                />
              </div>
              <div>
                <TextField
                  placeholder="Last Name"
                  type="text"
                  name="last_name"
                  value={this.state.last_name}
                  onChange={this.handleChangeFor("last_name")}
                />
              </div>
              <div>
                <TextField
                  placeholder="email"
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChangeFor("email")}
                />
              </div>
              <div>
                <TextField
                  placeholder="Phone Number"
                  type="number"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleChangeFor("phone")}
                />
              </div>
              <div>
                <TextField
                  placeholder="Handicap (yds)"
                  type="number"
                  name="handicap"
                  min="16"
                  max="27"
                  value={this.state.handicap}
                  onChange={this.handleChangeFor("handicap")}
                />
              </div>
              <div>
                <TextField
                  placeholder="ATA #"
                  type="number"
                  name="ata_number"
                  value={this.state.ata_number}
                  onChange={this.handleChangeFor("ata_number")}
                />
              </div>
              {/* {JSON.stringify(this.state.competitionEvents)} */}
              <div>
                {this.state.competition.events.map(ev => {
                  return (
                    <ul className="Checkbox" key={ev.id}>
                      <li>
                        {ev.name}
                        <Checkbox
                          value={ev.id}
                          onChange={this.handleChangeCheckBox}
                        />
                      </li>
                    </ul>
                  );
                })}
              </div>
              {/* <div>
                <ul className="Checkbox">
                    <li>
                        Singles
                        <Checkbox
                        value="checkedSingles"
                        checked={this.state.checkedSingles}
                        onChange={this.handleChangeCheckBox('checkedSingles')} />
                    </li>
                    <li>
                        Doubles
                        <Checkbox
                        value="checkedDoubles"
                        checked={this.state.checkedDoubles}
                        onChange={this.handleChangeCheckBox('checkedDoubles')} />
                    </li>
                    <li>
                        Handicap
                        <Checkbox
                        
                        value="checkedHandicap"
                        checked={this.state.checkedHandicap}
                        onChange={this.handleChangeCheckBox('checkedHandicap')} />
                    </li>
                </ul>
            </div> */}
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  name="submit"
                  value="Register"
                >
                  Register
                </Button>
              </div>
            </form>
          </center>
        </Card>
      </div>
    );
  }
}

ShooterRegistration.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShooterRegistration);
