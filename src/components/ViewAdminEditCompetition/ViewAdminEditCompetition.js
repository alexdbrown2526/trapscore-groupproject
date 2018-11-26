import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Button, Modal, TextField, Typography } from '@material-ui/core';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    minWidth: theme.spacing.unit * 50,
    maxWidth: '80%',
    maxHeight: '90%',
    overflowY: 'scroll',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  headerSpacer: {
    paddingTop: theme.spacing.unit * 4,
  },
});

const ViewAdminEditCompetition = props => {
  const { classes } = props;
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      onBackdropClick={props.handleClose}
      onEscapeKeyDown={props.handleClose}
    >
      <div className={classes.paper}>
        <Typography variant="h4">{props.editCompetition.name}</Typography>
        <Typography variant="h6" className={classes.headerSpacer}>
          Shareable Registration URL:
        </Typography>
        <Typography variant="body1">
          {process.env.REACT_APP_ROOT_URL}
          /#/registration/
          {props.editCompetition.id}&{props.editCompetition.secret_url}
        </Typography>
        <Typography variant="h6" className={classes.headerSpacer}>
          Staff Username:
        </Typography>
        <Typography variant="body1">
          {props.editCompetition.name
            .toLowerCase()
            .split(' ')
            .join('')}
        </Typography>
        <Typography variant="h6" className={classes.headerSpacer}>
          Default Password:
        </Typography>
        <Typography variant="body1">
          {props.editCompetition.name
            .toLowerCase()
            .split(' ')
            .join('') + '-admin'}
        </Typography>
        <Typography variant="h6" className={classes.headerSpacer}>
          Change Password
        </Typography>
        <Typography variant="body1">
          To change the password, type the default password and the new desired
          password into the text fields below.
        </Typography>
        <form>
          <TextField
            value={props.editCompetition.defaultPassword}
            onChange={props.handleEditChangeFor('defaultPassword')}
            placeholder="Default Password"
          />
          <TextField
            value={props.editCompetition.newPassword}
            onChange={props.handleEditChangeFor('newPassword')}
            placeholder="New Password"
          />

          <Typography variant="h6" className={classes.headerSpacer}>
            Edit Competition Details
          </Typography>

          <TextField
            value={props.editCompetition.name}
            onChange={props.handleEditChangeFor('name')}
            placeholder="Competition Name"
            type="text"
            name="name"
          />
          <TextField
            value={props.editCompetition.location}
            onChange={props.handleEditChangeFor('location')}
            placeholder="Location"
            type="text"
            name="location"
          />
          <Typography variant="h6" className={classes.headerSpacer}>
            Select Date
          </Typography>
          <DatePicker
            selected={props.editCompetition.date}
            onChange={props.handleDateChange}
          />

          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => {
                props.submitEdits();
                props.handleClose();
              }}
            >
              Submit
            </Button>
            <Button
              onClick={() => {
                props.deleteCompetition(props.edit.id);
              }}
            >
              Delete
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

ViewAdminEditCompetition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewAdminEditCompetition);
