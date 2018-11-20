import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Select, MenuItem } from '@material-ui/core/';

const styles = theme => ({
  selectBox: {
    width: '100%',
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
});

const EventSelect = props => {
  const { classes } = props;
  return (
    <>
      {/* <InputLabel htmlFor="age-simple">Age</InputLabel> */}
      <Select
        className={classes.selectBox}
        value={props.selectedEvent}
        onChange={props.setEvent}
      >
        <MenuItem value={0}>None</MenuItem>
        {props.events.map(event => {
          return <MenuItem value={event.id}>{event.name}</MenuItem>;
        })}
      </Select>
    </>
  );
};

EventSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventSelect);
