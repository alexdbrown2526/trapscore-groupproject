import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { connect } from "react-redux";

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
    selectedRound: 1
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
        <Button>Next Round</Button>
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
  traps: reduxState.traps,
  selectedTraps: reduxState.selectedTrap
});

const Scores = withStyles(styles)(Scoring);

export default connect(mapStateToProps)(Scores);
