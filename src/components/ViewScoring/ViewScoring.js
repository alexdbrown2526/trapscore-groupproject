import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { connect } from "react-redux";
import { List } from "@material-ui/core/";
import ScoringItem from "../ScoringItem/ScoringItem";
import PropTypes from "prop-types";
import { Typography } from '@material-ui/core';


import { USER_ACTIONS } from "../../redux/actions/userActions";

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = theme => ({
  toggleContainer: {
    display: 'flex',
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
    flexDirection: 'row',
    margin: '0',
    width: '100vw',
    border: 0,
    borderRadius: 2,
  },
  buttons: {
    height: '60%',
    width: '20vw',
    lineHeight: '4vw',
    fontSize: '4vw',
    alignItems: "right",
    display: 'flex'
  },
  headers: {
    alignItems: "center",
    paddingTop: '1%',
    paddingBottom: '5%'
  },
  headersTwo: {
    alignItems: "center",
    paddingTop: '5%',
  },
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
    toast('Scores Submitted!')
    this.props.dispatch({
      type: USER_ACTIONS.SUBMIT_SCORES,
      payload: this.props.selectedTrap
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
    const { classes } = this.props;
    return (
      <div>
        <Typography className={classes.headers} variant="h4">Rounds</Typography>
        <ToggleButtonGroup
          value={this.props.currentRound}
          exclusive
          onChange={this.selectRound}
          className={classes.toggleContainer}
        >
          <ToggleButton className={classes.buttons} value={1}>1</ToggleButton>
          <ToggleButton className={classes.buttons} value={2}>2</ToggleButton>
          <ToggleButton className={classes.buttons} value={3}>3</ToggleButton>
          <ToggleButton className={classes.buttons} value={4}>4</ToggleButton>
          <ToggleButton className={classes.buttons} value={5}>5</ToggleButton>
        </ToggleButtonGroup>
        <Typography className={classes.headersTwo} variant="h5"> Shooters</Typography>
        <hr></hr>
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

Scoring.propTypes = {
  classes: PropTypes.object.isRequired
};


const mapStateToProps = reduxState => ({
  currentRound: reduxState.currentRound,
  // reduxState: reduxState,
  selectedTrap: reduxState.selectedTrap
});

const Scores = withStyles(styles)(Scoring);

export default connect(mapStateToProps)(Scores);
