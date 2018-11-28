import React from "react";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
  leftSide: {
    backgroundColor: "lightgray",
    width: "20%",
    minWidth: 250,
    height: "100vh",
    overflowY: "scroll"
  }
});

const DndLeftSide = props => {
  const { classes } = props;
  return <div className={classes.leftSide}>{props.children}</div>;
};

DndLeftSide.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DndLeftSide);
