import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { connect } from "react-redux";
import { List } from "@material-ui/core/";
import ScoringItem from "../ScoringItem/ScoringItem";

import { USER_ACTIONS } from "../../redux/actions/userActions";

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
    page: 0,
    selectedRound: 1,
    ToggleButton: false,
    NextRoundButton: false
  };

  selectRound = (event, value) => {
    this.props.dispatch({
      type: USER_ACTIONS.SET_CURRENT_ROUND,
      payload: value
    });
  };

  nextRound = () => {
    this.props.dispatch({
      type: USER_ACTIONS.SET_CURRENT_ROUND,
      payload: this.props.currentRound + 1
    });
  };


  finalRound = () => {
    this.props.dispatch({
      type: USER_ACTIONS.SET_CURRENT_ROUND,
      payload: this.props.currentRound + 1
    });
  };

  setScore = (index, round, value) => {
    this.props.dispatch({
      type: USER_ACTIONS.SET_SHOT,
      payload: {
        index: index,
        round: round,
        score: value
      }
    });
  };

  render() {
    return (
      <div>
        <h1>Scoring</h1>
        {/* <pre> {JSON.stringify(this.props, null, 2)}</pre>  */}
        <pre> {JSON.stringify(this.props.selectedTrap, null, 2)}</pre>
        <h2>{this.props.selectedTrap.name}</h2>
        <h2>Rounds</h2>
        <ToggleButtonGroup
          value={this.props.currentRound}
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
          {this.props.selectedTrap.shooters.map((shooter, index) => {
            return (
              <ScoringItem
                key={shooter.shooter_id}
                shooter={shooter}
                round={this.props.currentRound}
                index={index}
                setScore={this.setScore}
              />
            );
          })}
        </List>

        {this.props.selectedTrap.shooters.reduce((sum, current) => {
          if (current.shots[this.props.currentRound - 1] === null) {
            return sum;
          } else {
            return sum + 1;
          }
        }, 0) < this.props.selectedTrap.shooters.length ? (
          this.props.currentRound < 5 ? (
            <Button disabled={true}>Next Round</Button>
          ) : (
            <Button disabled={true}>Submit Scores</Button>
          )
        ) : (
          this.props.currentRound < 5
          ?
          <Button onClick={this.nextRound}>Next Round</Button>
          :
          <Button onClick={this.finalRound}>Submit Scores</Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  currentRound: reduxState.currentRound,
  // reduxState: reduxState,
  selectedTrap: reduxState.selectedTrap
});

const Scores = withStyles(styles)(Scoring);

export default connect(mapStateToProps)(Scores);
