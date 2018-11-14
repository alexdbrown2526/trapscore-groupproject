import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { registrationRoute } from "../../navigationRoutes";

import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core/";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const styles = {
  list: {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
  },
};

const NavSideBottomActions = props => {
  const { classes } = props;
  return (
    <div className={classes.list}>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => {
            props.toRegistrationPage();
          }}
        >
          <ListItemText>Registration</ListItemText>
          <ListItemSecondaryAction>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button onClick={props.logout}>
          <ListItemText>Log Out</ListItemText>
          <ListItemSecondaryAction>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
};

NavSideBottomActions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavSideBottomActions);
