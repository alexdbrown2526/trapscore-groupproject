import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core/';

const styles = theme => ({
  spacer: {
    width: '100%',
    height: theme.spacing.unit * 5,
  },
  centerButtonFixed: {
    position: 'fixed',
    left: '50%',
    bottom: theme.spacing.unit * 2,
    transform: `translate(-50%, 0%)`,
    width: '85%',
  },
  centerButtonRelative: {
    position: 'relative',
    left: '50%',
    bottom: theme.spacing.unit * 2,
    transform: `translate(-50%, 0%)`,
    width: '85%',
  },
});

const ScoringAdvanceButton = props => {
  const { classes } = props;
  const shotsThisRound = props.shooters.reduce((sum, current) => {
    if (current.shots[props.currentRound - 1] === null) {
      return sum;
    } else {
      return sum + 1;
    }
  }, 0);
  const shotsThisRotation = props.shooters.reduce((sum, current) => {
    return (
      sum +
      current.shots.reduce((shotsSum, currentShot) => {
        if (currentShot === null) {
          return shotsSum;
        } else {
          return shotsSum + 1;
        }
      }, 0)
    );
  }, 0);

  return (
    <>
      {props.currentRound < 5 ? (
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.centerButtonFixed}
          disabled={shotsThisRound < props.shooters.length}
          onClick={props.nextRound}
        >
          Next Round
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.centerButtonFixed}
          disabled={shotsThisRotation < props.shooters.length * 5}
          onClick={props.nextRound}
        >
          Submit Scores
        </Button>
      )}
    </>
  );
};

export default withStyles(styles)(ScoringAdvanceButton);
