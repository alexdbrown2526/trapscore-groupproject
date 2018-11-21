import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  list: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
  },
};

const NavSideBottom = props => {
  const { classes } = props;
  return <div className={classes.list}>{props.children}</div>;
};

NavSideBottom.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavSideBottom);
