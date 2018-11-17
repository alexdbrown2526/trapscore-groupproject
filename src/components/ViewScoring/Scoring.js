import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { connect } from "react-redux";
import { List, ListItem, ListItemText } from "@material-ui/core/";
import ScoringItem from "../ScoringItem/ScoringItem";

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
    ToggleButton: false,
    NextRoundButton: false,
  };

  selectRound = (event, value) => {
    this.setState({ ...this.state, selectedRound: value });
  };

  nextRound = () => {
    this.setState({ ...this.state, selectedRound: this.state.selectedRound + 1, });
    if (this.state.selectedRound === 5) {
      this.setState({ ...this.state, selectedRound: this.state.selectedRound, ToggleButton: true}); 

    }
  };

  render() {
    let roundItem;
    if (this.state.selectedRound <= 4) {
      roundItem=<Button value={this.state.selectedRound} onClick={this.nextRound}>Next Round</Button>
    }
    else{
      roundItem=<Button>Submit Scores</Button>
    }

    return (
      <div>
        <h1>Scoring</h1>
      {/* <pre> {JSON.stringify(this.props, null, 2)}</pre>  */}
      <pre> {JSON.stringify(this.props.selectedTrap, null, 2)}</pre> 
        <h2>{this.props.selectedTrap.name}</h2>
        <h2>Rounds</h2>
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
      
        {this.props.selectedTrap.shooters.map((shooter, index) => {
          return <ScoringItem key={shooter.id} shooter={shooter} round={this.state.selectedRound} index={index}/>
        })}

        {roundItem}
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  // reduxState,
  // traps: reduxState.traps,
  selectedTrap: reduxState.selectedTrap,
  Squad: reduxState.test,
  Members: reduxState.testTwo,
  // selectedShot: reduxState.selectedShot
});

const Scores = withStyles(styles)(Scoring);

export default connect(mapStateToProps)(Scores);

