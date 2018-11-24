import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { 
  AppBar, 
  IconButton, 
  Toolbar, 
  Typography 
} from "@material-ui/core/";

import MenuIcon from "@material-ui/icons/Menu";

import NavSpacer from "../NavSpacer/NavSpacer";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const NavTop = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <NavSpacer />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={() => props.openDrawer(true)}
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            TrapScore
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

NavTop.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTop);
