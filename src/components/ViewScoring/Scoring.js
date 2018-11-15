import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { connect } from "react-redux";
import { List, ListItem, ListItemText } from "@material-ui/core/";

// TO POST: SHOOTER EVENT ID , SQUAD EVENT ID, SCORE
// SQUAD HAS THE EVENT ID

//TODO: []Make every hit or missed function send the result to a saga. Make this saga axios.post to server
//TODO: []Make IF statements actually do what it says in the console logs
//TODO: []Make Toggle Buttons actually toggle
//TODO: []Make Round Switching toggles store the current scores
//TODO: []Make conditonal render on last round for Submit button, make this send all scores to the saga and axios.post to server.

const styles = theme => ({
  toggleContainer: {
    height: 56,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: `${theme.spacing.unit}px 0`,
    background: theme.palette.background.default
  }
});

class Scoring extends Component {
  state = {
    Shooters: this.props.Members,
    page: 0,
    selectedRound: 1,
    selectedShot: 1,
    PersonOne: 0,
    PersonTwo: 0,
    PersonThree: 0,
    PersonFour: 0,
    PersonFive: 0,
    TotalScoreOne: 0,
    TotalScoreTwo: 0,
    TotalScoreThree: 0,
    TotalScoreFour: 0,
    TotalScoreFive: 0,
    ToggleButton: false,
    AllScores: []
  };

  checkScoreTotal = (event, value) => {
    if (this.state.TotalScoreOne === 4) {
      console.log(
        "Make this stop you from being able to increase total score anymore"
      );
    } else if (this.state.TotalScoreTwo === 4) {
      console.log(
        "Make this stop you from being able to increase total score anymore"
      );
    } else if (this.state.TotalScoreThree === 4) {
      console.log(
        "Make this stop you from being able to increase total score anymore"
      );
    } else if (this.state.TotalScoreFour === 4) {
      console.log(
        "Make this stop you from being able to increase total score anymore"
      );
    } else if (this.state.TotalScoreFive === 4) {
      console.log("Make this conditonally render the NEXT ROUND button");
    } else {
      console.log("This is fine");
    }
  };

  // FIRST SHOOTER TOGGLE BUTTON FUNCTION
  hitOrMissed0 = (event, value) => {
    console.log("this is the value", value);
    console.log("this is the event", event.target);
    console.log("this is the score", this.state.TotalScoreOne);

    this.setState({
      ...this.state,
      PersonOne: this.state.PersonOne + value,
      TotalScoreOne: this.state.TotalScoreOne + 1
    });
    this.checkScoreTotal();
  };
  // SECOND SHOOTER TOGGLE BUTTON FUNCTION
  hitOrMissed1 = (event, value) => {
    console.log("this is the value", value);
    console.log("this is the event", event.target);
    this.setState({
      ...this.state,
      PersonTwo: this.state.PersonTwo + value,
      TotalScoreTwo: this.state.TotalScoreTwo + 1
    });
    this.checkScoreTotal();
  };
  // THIRD SHOOTER TOGGLE BUTTON FUNCTION
  hitOrMissed2 = (event, value) => {
    console.log("this is the value", value);
    console.log("this is the event", event.target);
    this.setState({
      ...this.state,
      PersonThree: this.state.PersonThree + value,
      TotalScoreThree: this.state.TotalScoreThree + 1
    });
    this.checkScoreTotal();
  };
  // FOURTH SHOOTER TOGGLE BUTTON FUNCTION
  hitOrMissed3 = (event, value) => {
    console.log("this is the value", value);
    console.log("this is the event", event.target);
    this.setState({
      ...this.state,
      PersonFour: this.state.PersonFour + value,
      TotalScoreFour: this.state.TotalScoreFour + 1
    });
    this.checkScoreTotal();
  };
  // FIFTH SHOOTER TOGGLE BUTTON FUNCTION
  hitOrMissed4 = (event, value) => {
    console.log("this is the value", value);
    console.log("this is the event", event.target);
    this.setState({
      ...this.state,
      PersonFive: this.state.PersonFive + value,
      TotalScoreFive: this.state.TotalScoreFive + 1
    });
    this.checkScoreTotal();
  };

  selectRound = (event, value) => {
    this.setState({ ...this.state, selectedRound: value });
  };

  render() {
    return (
      <div>
        <h1>Scoring</h1>
        <h2>{this.props.selectedTraps.name}</h2>
        <h2>Rounds</h2>
        {JSON.stringify(this.props.Squad)}

        <ToggleButtonGroup
          value={this.state.selectedRound}
          exclusive
          onChange={this.selectRound}
        >
          <ToggleButton value={1}>1</ToggleButton>
          <ToggleButton value={2}>2</ToggleButton>
          <ToggleButton value={3}>3</ToggleButton>
          <ToggleButton value={4}>4</ToggleButton>
          <ToggleButton value={5}>5</ToggleButton>
        </ToggleButtonGroup>
        <h2>Shooters</h2>
        <List>
          {this.state.Shooters.map(shooter => {
            return (
              <ListItem key={shooter.id} value={shooter.id}>
                {shooter.first_name} {shooter.last_name}
              </ListItem>
            );
          })}
        </List>
        <List>
          <ListItem>
            Ira's Score: {this.state.PersonOne}/{this.state.TotalScoreOne}
          </ListItem>
          <ListItem>
            Sams Score: {this.state.PersonTwo}/{this.state.TotalScoreTwo}
          </ListItem>
          <ListItem>
            Chris' Score: {this.state.PersonThree}/{this.state.TotalScoreThree}
          </ListItem>
          <ListItem>
            Ozzy's Score: {this.state.PersonFour}/{this.state.TotalScoreFour}
          </ListItem>
          <ListItem>
            Thomas' Score: {this.state.PersonFive}/{this.state.TotalScoreFive}
          </ListItem>
        </List>
        {/* // FIRST SHOOTER TOGGLE BUTTON GROUP */}
        <ToggleButtonGroup
          value={this.props.Members[0]}
          exclusive
          onChange={this.hitOrMissed0}
        >
          <ToggleButton value={1}>Hit</ToggleButton>
          <ToggleButton value={0}>Miss</ToggleButton>
        </ToggleButtonGroup>
        {/* // */}
        {/* // SECOND SHOOTER TOGGLE BUTTON GROUP */}
        <ToggleButtonGroup
          value={this.props.Members[1]}
          exclusive
          onChange={this.hitOrMissed1}
        >
          <ToggleButton value={1}>Hit</ToggleButton>
          <ToggleButton value={0}>Miss</ToggleButton>
        </ToggleButtonGroup>
        {/* // */}
        {/* // THIRD SHOOTER TOGGLE BUTTON GROUP */}
        <ToggleButtonGroup
          value={this.props.Members[2]}
          exclusive
          onChange={this.hitOrMissed2}
        >
          <ToggleButton value={1}>Hit</ToggleButton>
          <ToggleButton value={0}>Miss</ToggleButton>
        </ToggleButtonGroup>
        {/* // */}
        {/* // FOURTH SHOOTER TOGGLE BUTTON GROUP */}
        <ToggleButtonGroup
          value={this.props.Members[3]}
          exclusive
          onChange={this.hitOrMissed3}
        >
          <ToggleButton value={1}>Hit</ToggleButton>
          <ToggleButton value={0}>Miss</ToggleButton>
        </ToggleButtonGroup>
        {/* // */}
        {/* // FIFTH SHOOTER TOGGLE BUTTON GROUP */}
        <ToggleButtonGroup
          value={this.props.Members[4]}
          exclusive
          onChange={this.hitOrMissed4}
        >
          <ToggleButton value={1}>Hit</ToggleButton>
          <ToggleButton value={0}>Miss</ToggleButton>
        </ToggleButtonGroup>
        {/* // */}

        <Button onClick={this.reset}>Next Round</Button>
        {JSON.stringify(this.props.Members)}
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
  traps: reduxState.traps,
  selectedTraps: reduxState.selectedTrap,
  Squad: reduxState.test,
  Members: reduxState.testTwo
});

const Scores = withStyles(styles)(Scoring);

export default connect(mapStateToProps)(Scores);
