import React, { Component } from "react";
import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./ShooterRegistration.css";
import { connect } from 'react-redux';

class ShooterRegistration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      phone: Number,
      handicap: Number,
      ata_number: Number,
      //array of event IDs from checkboxes.
      eventsList: [],
    };
  }

  componentDidMount() {
    axios({
      method: "GET",
      url: `/api/competition/event`
    }).then(response => {
      console.log(response);

      let eventsList;

      if (response.data) {
          eventsList = response.data.map(event => ({id: event.id, name: event.name, checked: false}));
      } else {
          eventsList = [];
      }
      this.setState({ ...this.state, eventsList: eventsList });
    });
  }

  registerShooter = event => {
    event.preventDefault();
    const body = this.state;

    if (this.state.handicap < 16) {
      alert("You must choose a number between 16 and 27");
    } else if (this.state.handicap > 27) {
      alert("You must choose a number between 16 and 27");
    }

    axios({
      method: "POST",
      url: "/api/competition/shooter",
      data: body
    }).then(response => {
      console.log(response);

      this.setState({
        first_name: "",
        last_name: "",
        email: "",
        phone: Number,
        handicap: Number,
        ata_number: Number,
        eventsChecked: []
      });
    });
  };

  handleChangeFor = propertyName => event => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
    });
  };

  handleChangeCheckBox = (event, checked) => {
    //event.target.value is the event ID
    //find the index in this.state.eventsList from the eventID
    let indexOfCheckedItem = this.state.eventsList.findIndex(item => item.id === parseInt(event.target.value))
    this.setState({
        ...this.state,
        eventsList: [
            ...this.state.eventsList.slice(0, indexOfCheckedItem), 
            {
                ...this.state.eventsList[indexOfCheckedItem], 
                checked: checked,
            }, 
            ...this.state.eventsList.slice(indexOfCheckedItem + 1)
        ]
    })
  }

  render() {
    return (
      <div>
        <Card className="Register-Card">
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
                {this.state.eventsList.map(ev => {
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

export default (ShooterRegistration);
