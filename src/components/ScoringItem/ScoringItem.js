import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { connect } from "react-redux";
import { List, ListItem, ListItemText } from "@material-ui/core/";

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

class ScoringItem extends Component {
  state = {
    Shooters: this.props.Members,
    RoundScore: 0,
    CurrentRound: 0,
    selectedShot: null,
    maxNumber: 1,
    numberOfHits: 0
  };
  
  addHit = () => {
    console.log('Hit');
    let hits = this.state.numberOfHits++;
    this.setState({
      ...this.state,
      numberOfHits: hits 
    });
    console.log('Hits', hits);
  
  };
  //This is the first function run on either button toggle
  selectShot = (event, value) => {
    this.addHit(); // This adds 1 to the numberOfHits variable, this is so we can set an if statement that will conditonally render the next round button after everybody has shot
    this.setState({
      ...this.state,
      selectedShot: value,
      RoundScore: this.state.RoundScore + value,
      CurrentRound: this.state.CurrentRound + 1,
    });
    console.log('Number of hits', this.state.numberOfHits);
    this.checkScoreTotal(this.state.RoundScore, this.state.CurrentRound, value, event);
  };
  //IF CurrentRound is 1, this function is run
  checkScoreTotal = (event, value) => {
    if (this.state.CurrentRound === 1) {
      this.setState({
        ...this.state,
        selectedShot: value,
        RoundScore: this.state.RoundScore + value,
        CurrentRound: this.props.round,
      });
    } this.minus(value, event);
  };

  //IF RoundScore is 1, this function is run
    minus = (event, value) => {
      console.log('Event', event);
      console.log('Value', value);
      console.log('RoundScore', this.state.RoundScore);
      console.log('CurrentRound', this.state.CurrentRound);
      console.log('Selected Shot', this.state.selectedShot);
      if (this.state.RoundScore === 1) {
        this.setState({
          ...this.state,
          RoundScore: this.state.RoundScore - 1,
          CurrentRound: this.props.round,
          selectedShot: 0,
        });
      } 
    }
    
  render() {
    return (
      <div>
        {JSON.stringify(this.props.round)}
        <List>
          <ListItem>
            {this.props.shooter.first_name}
            {this.state.RoundScore}/{this.state.CurrentRound}
            <ToggleButtonGroup
              value={this.state.selectedShot}
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

const mapStateToProps = reduxState => ({
  reduxState,
  traps: reduxState.traps,
  selectedTraps: reduxState.selectedTrap,
  Squad: reduxState.test,
  Members: reduxState.testTwo
});

const Item = withStyles(styles)(ScoringItem);

export default connect(mapStateToProps)(Item);
