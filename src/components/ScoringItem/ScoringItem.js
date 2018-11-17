import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { connect } from "react-redux";
import { List, ListItem, ListItemText } from "@material-ui/core/";
import { USER_ACTIONS } from "../../redux/actions/userActions";

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
//Pass in the index from the map, give it the button which will call the reducer in that order.
// NEED TO SEND: Index of the shooter, the value of the shot, shooter_event_id, name of shooter
//[]TODO: 1. Finish adding/subtracting logic for each round
//[]TODO: 2. Reset toggles on each round
//[]TODO: Real data, dispatching data to redux

class ScoringItem extends Component {
  //This is the first function run on either button toggle
  selectShot = (event, value) => {
    let payload = {
      index: this.props.index,
      round: this.props.round,
      score: value
    };
    this.props.dispatch({
      type: USER_ACTIONS.SET_SHOT,
      payload: payload
    });
  };

  roundScoreFunction = (sumOfShots, currentShot) => {
    return sumOfShots + currentShot;
  };

  CurrentRoundFunction = (sumOfShots, currentShot) => {
    if (currentShot === null) {
      return sumOfShots;
    } else {
      return sumOfShots + 1;
    }
  };

  render() {
    return (
      <div>
        <List>
          <ListItem>
            {this.props.shooter.first_name}
            {this.props.shooter.shots.reduce(this.roundScoreFunction)}/
            {this.props.shooter.shots.reduce(this.CurrentRoundFunction, 0)}
            <ToggleButtonGroup
              value={this.props.shooter.shots[this.props.round - 1]}
              exclusive
              onChange={this.selectShot}
            >
              <ToggleButton value={1}>Hit</ToggleButton>
              <ToggleButton value={0}>Miss</ToggleButton>
            </ToggleButtonGroup>
          </ListItem>
        </List>
      </div>
    );
  }
}

const Item = withStyles(styles)(ScoringItem);

export default connect(Item);
