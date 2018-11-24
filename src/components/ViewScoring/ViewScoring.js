import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { connect } from "react-redux";
import { List, } from "@material-ui/core/";
import ScoringItem from "../ScoringItem/ScoringItem";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import ScoringAdvanceButton from "../ScoringAdvanceButton/ScoringAdvanceButton";

import "./ViewScoring.css";

import { USER_ACTIONS } from "../../redux/actions/userActions";

import { toast } from "react-toastify";

const styles = theme => ({
  toggleContainer: {
    display: "flex",
    overflow: "hidden",
    backfaceVisibility: "hidden",
    flexDirection: "row",
    margin: "0",
    width: "100vw",
    border: 0,
    borderRadius: 2
  },
  bigContainer: {
    maxWidth: 2000,
    maxHeight: 500
  },
  buttons: {
    height: "60%",
    width: "20vw",
    lineHeight: "4vw",
    fontSize: "4vw",
    alignItems: "right",
    display: "flex"
  },
  headers: {
    alignItems: "center",
    display: "flex",
    paddingTop: "1%",
    paddingBottom: "5%",
    paddingLeft: "37%"
  },
  headersTwo: {
    alignItems: "center",
    paddingTop: "5%",
    paddingLeft: "35%",
    fontSize: "8vw"
  },
  headersThree: {
    paddingLeft: "38%"
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
    if (this.props.currentRound < 5) {
      this.props.dispatch({
        type: USER_ACTIONS.SET_CURRENT_ROUND,
        payload: this.props.currentRound + 1
      });
    } else {
      toast("Scores Submitted, Posts Rotating");
      this.props.dispatch({
        type: USER_ACTIONS.SUBMIT_SCORES,
        payload: this.props.selectedTrap
      });
    }
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
      <div className={classes.bigContainer}>
        <Typography className={classes.headersThree} variant="h6">
          Rotation: {this.props.selectedTrap.squad_trap.current_rotation}
        </Typography>
        <hr className="hr2" />
        <Typography className={classes.headers} variant="h4">
          Rounds
        </Typography>
        <ToggleButtonGroup
          value={this.props.currentRound}
          exclusive
          onChange={this.selectRound}
          className={classes.toggleContainer}
        >
          <ToggleButton className={classes.buttons} value={1}>
            1
          </ToggleButton>
          <ToggleButton className={classes.buttons} value={2}>
            2
          </ToggleButton>
          <ToggleButton className={classes.buttons} value={3}>
            3
          </ToggleButton>
          <ToggleButton className={classes.buttons} value={4}>
            4
          </ToggleButton>
          <ToggleButton className={classes.buttons} value={5}>
            5
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography
          disableTypography
          className={classes.headersTwo}
          variant="h5"
        >
          {" "}
          Shooters
        </Typography>
        <hr className="hr" />
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
        <ScoringAdvanceButton
          shooters={this.props.selectedTrap.shooters}
          currentRound={this.props.currentRound}
          nextRound={this.nextRound}
        />
      </div>
    );
  }
}

Scoring.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = reduxState => ({
  currentRound: reduxState.currentRound,
  selectedTrap: reduxState.selectedTrap,
  squads: reduxState.squaddingData
});

const Scores = withStyles(styles)(Scoring);

export default connect(mapStateToProps)(Scores);
