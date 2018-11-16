import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  rightSide: {
    width: '75%',
    minWidth: 100,
    height: '100vh',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'start',
    alignItems: 'start',
  },
});

const DndRightSide = props => {
  const { classes } = props;
  return <div className={classes.rightSide}>{props.children}</div>;
};

DndRightSide.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DndRightSide);
