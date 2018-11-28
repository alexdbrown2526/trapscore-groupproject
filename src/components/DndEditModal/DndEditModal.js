import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  Button, 
  IconButton, 
  Modal, 
  TextField 
} from '@material-ui/core/';

import DndCard from '../DndCard/DndCard';

const styles = theme => ({
  modalPositioning: {
    position: 'absolute',
    boxShadow: theme.shadows[5],
    top: `30%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  },
  upperRightButton: {
    float: 'right'
  },
  title: {
    marginBottom: theme.spacing.unit * 3
  },
  textField: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    width: 200
  }
});

class DndEditModal extends Component {
  state = {
    open: false,
    field: '',
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.setState({ field: this.props.field });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = () => {
    this.props.edit(this.props.id, this.state.field);
    this.handleClose();
  };

  handleDelete = () => {
    this.props.delete(this.props.id);
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <IconButton onClick={this.handleOpen}>
          <EditIcon />
        </IconButton>
        <Modal open={this.state.open} onClose={this.handleClose}>
          <div className={classes.modalPositioning}>
            <DndCard
              noMargin
              title={'Edit Name'}
              cornerButton={
                <IconButton onClick={this.handleDelete}>
                  <DeleteIcon />
                </IconButton>
              }
              cardActions={
                <>
                  <Button onClick={this.handleSubmit}>Submit</Button>
                  <Button onClick={this.handleClose}>Cancel</Button>
                </>
              }
            >
              <TextField
                label="Name"
                className={classes.textField}
                value={this.state.field}
                onChange={this.handleChange('field')}
              />
            </DndCard>
          </div>
        </Modal>
      </>
    );
  }
}

DndEditModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DndEditModal);
