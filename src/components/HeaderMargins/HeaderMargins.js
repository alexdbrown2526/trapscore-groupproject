import React from "react";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
  headerMargins: {
    width: "100%",
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
  }
});

const HeaderMargins = props => {
  const { classes } = props;
  return <div className={classes.headerMargins}>{props.children}</div>;
};

HeaderMargins.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HeaderMargins);
