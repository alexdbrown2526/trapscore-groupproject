import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import PlusIcon from '@material-ui/icons/Add';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 5,
    bottom: 0,
    right: 0,
    position: 'fixed',
  },
});

const DndAddButton = props => {
  const { classes } = props;
  return (
    <Button
      variant="fab"
      color="primary"
      className={classes.button}
      onClick={props.onClick}
    >
      <PlusIcon />
    </Button>
  );
};

DndAddButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DndAddButton);
