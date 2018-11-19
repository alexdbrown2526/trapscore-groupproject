import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'start',
  },
});

const DndPage = props => {
  const { classes } = props;
  return <div className={classes.root}>{props.children}</div>;
};

DndPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DndPage);
