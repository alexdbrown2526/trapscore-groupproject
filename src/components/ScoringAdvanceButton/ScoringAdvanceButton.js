import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  advanceButton: {
    margin: theme.spacing.unit,
    width: '100%',
  },
});

const ScoringAdvanceButton = props => {
  const shotsSoFar = props.shooters.reduce((sum, current) => {
    if (current.shots[props.currentRound - 1] === null) {
      return sum;
    } else {
      return sum + 1;
    }
  }, 0);
  console.log('shotsSoFar:', shotsSoFar);
  return (
    <>
      {shotsSoFar < props.shooters.length ? (
        props.currentRound < 5 ? (
          <Button disabled={true}>Next Round</Button>
        ) : (
          <Button disabled={true}>Submit Scores</Button>
        )
      ) : props.currentRound < 5 ? (
        <Button onClick={props.nextRound}>Next Round</Button>
      ) : (
        <Button onClick={props.nextRound}>Submit Scores</Button>
      )}
    </>
  );
};

export default withStyles(styles)(ScoringAdvanceButton);
