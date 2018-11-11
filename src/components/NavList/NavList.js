import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import {
  rosterRoute,
  squaddingRoute,
  schedulingRoute,
  selectTrapRoute,
  resultsRoute,
} from "../../navigationRoutes";

import { List, ListItem, ListItemText } from "@material-ui/core/";

const styles = {
  userDetail: {
    padding: 24,
    width: "100%",
  },
  contestDetail: {
    paddingLeft: 24,
    width: "100%",
  },
  list: {
    width: 240,
  },
};

const NavList = props => {
  const { classes } = props;
  return (
    <div className={classes.list}>
      <List>
        {/* Roster */}
        <ListItem
          button
          onClick={() => {
            props.navigateTo(rosterRoute);
          }}
        >
          <ListItemText primary={"Roster"} />
        </ListItem>
        {/* Squad */}
        <ListItem
          button
          onClick={() => {
            props.navigateTo(squaddingRoute);
          }}
        >
          <ListItemText primary={"Squad"} />
        </ListItem>
        {/* Schedule */}
        <ListItem
          button
          onClick={() => {
            props.navigateTo(schedulingRoute);
          }}
        >
          <ListItemText primary={"Schedule"} />
        </ListItem>
        {/* Judge */}
        <ListItem
          button
          onClick={() => {
            props.navigateTo(selectTrapRoute);
          }}
        >
          <ListItemText primary={"Judge"} />
        </ListItem>
        {/* Results */}
        <ListItem
          button
          onClick={() => {
            props.navigateTo(resultsRoute);
          }}
        >
          <ListItemText primary={"Results"} />
        </ListItem>
      </List>
    </div>
  );
};

NavList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavList);
