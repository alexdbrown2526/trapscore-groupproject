import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { ListItem, ListItemText } from "@material-ui/core/";

const styles = theme => ({
  score: {
    height: '70%',
    width: '16vw',
    lineHeight: '9vw',
    fontSize: '7vw',
  },
  buttons: {
    height: '80%',
    width: '17.5vw',
    lineHeight: '13.5vw',
    fontSize: '10vw',
  },
  shooter: {
    height: '10%',
    width: '16vw',
    lineHeight: '15vw',
    fontSize: '5vw',
  },
});

const ScoringItem = props => {
  const { classes } = props;
  return (
    <ListItem>
      <ListItemText className={classes.shooter}>{props.shooter.first_name}</ListItemText>
      <ListItemText className={classes.score}>
      {props.shooter.shots.reduce((sumOfShots, currentShot) => {
        return sumOfShots + currentShot;
      }, 0)}
      /
      {props.shooter.shots.reduce((sumOfShots, currentShot) => {
        if (currentShot === null) {
          return sumOfShots;
        } else {
          return sumOfShots + 1;
        }
      }, 0)}
      </ListItemText>
      <ToggleButtonGroup
        value={props.shooter.shots[props.round - 1]}
        exclusive
        selected
        onChange={(event, value) => {
          props.setScore(props.index, props.round, value);
        }}
      >
        <ToggleButton className={classes.buttons}value={1}>O</ToggleButton>
        <ToggleButton className={classes.buttons}value={0}>/</ToggleButton>
      </ToggleButtonGroup>
    </ListItem>
  );
};

export default withStyles(styles)(ScoringItem);
