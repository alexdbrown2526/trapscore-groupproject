import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { ListItem, ListItemText } from "@material-ui/core/";

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

const ScoringItem = props => {
  const { classes } = props;
  return (
    <ListItem>
      <ListItemText>
      {props.shooter.first_name}
        </ListItemText>
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
      <ToggleButtonGroup
        classes = {classes.toggleContainer}
        value={props.shooter.shots[props.round - 1]}
        exclusive
        selected
        onChange={(event, value) => {
          props.setScore(props.index, props.round, value);
        }}
      >
        <ToggleButton value={0}>Miss</ToggleButton>
        <ToggleButton value={1}>Hit</ToggleButton>
      </ToggleButtonGroup>
    </ListItem>
  );
};

export default withStyles(styles)(ScoringItem);
