import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import PlusIcon from '@material-ui/icons/Add';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 3,
    width: theme.spacing.unit * 30,
  },
});

const DndAddButton = props => {
  const { classes } = props;
  return (
    <Button
      color="primary"
      variant="contained"
      className={classes.button}
      onClick={props.onClick}
    >
      <PlusIcon fontSize="large" />
    </Button>
  );
};

DndAddButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DndAddButton);
