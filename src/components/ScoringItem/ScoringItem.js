import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { ListItem, ListItemText } from "@material-ui/core/";
import { Typography } from '@material-ui/core';

const styles = theme => ({
  score: {
    height: '70%',
    width: '16vw',
    lineHeight: '9vw',
    fontSize: '7vw',
    textAlign: 'left'
  },
  buttons: {
    height: '80%',
    width: '16vw',
    lineHeight: '13vw',
    fontSize: '10vw',
    maxWidth: '20vw'
  },
  shooter: {
    fontSize: '7vw',
    marginLeft: '7%',
    fontFamily: 'Roboto, sans-serif',
    maxWidth: '35vw',
    overflow: 'hidden',
    textOverflow: 'ellipses'
    
   
    
  },
});

const ScoringItem = props => {
  const { classes } = props;
  return (
    <ListItem>
      <ListItemText disableTypography className={classes.shooter}>{props.shooter.first_name}</ListItemText>
      <Typography className={classes.score}>
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
      </Typography>
      <ToggleButtonGroup
        value={props.shooter.shots[props.round - 1]}
        exclusive
        selected
        onChange={(event, value) => {
          props.setScore(props.index, props.round, value);
        }}
      >
        <ToggleButton className={classes.buttons}value={1}>/</ToggleButton>
        <ToggleButton className={classes.buttons}value={0}>O</ToggleButton> 
      </ToggleButtonGroup>
    </ListItem>
  );
};

export default withStyles(styles)(ScoringItem);
