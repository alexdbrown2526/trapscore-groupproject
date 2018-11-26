import React, { Component } from 'react';
import axios from 'axios';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { selectCompetitionRoute } from '../../navigationRoutes';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';

import { Button } from '@material-ui/core';

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
});

class ViewAdminEditCompetition extends Component {
  state = {
    date: '',
    name: '',
    location: '',
    defaultPassword: '',
    newPassword: '',
    // Conditional Rendering Variable
    isVisible: false,
    //
  };

  handleChangeFor = propertyName => event => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value,
    });
  };

  handleChange = date => {
    this.setState({
      date: date,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    toast('Competition Submitted!');
    const body = {
      id: this.props.edit.id,
      date: this.state.date,
      name: this.state.name,
      location: this.state.location,
    };

    axios({
      method: 'PUT',
      url: `/api/competition`,
      data: body,
    }).then(response => {
      console.log(response);
      this.setState({
        ...this.state,
        id: '',
        date: '',
        name: '',
        location: '',
        isVisible: false,
      });
    });
    console.log(this.state.isVisible);
    this.props.data();
  };

  render() {
    //Conditional Rendering if statement/variable
    let viewItem;
    if (this.state.isVisible) {
      viewItem = this.props.history.push(selectCompetitionRoute);
    }
    const { classes } = this.props;
    return (
      <div className={classes.modal}>
        <h1>Edit Competition</h1>
        <h2>{this.props.edit.name} </h2>
        <h3>Shareable Registration URL:</h3>
        <p>
          {process.env.REACT_APP_ROOT_URL}
          /#/registration/
          {this.props.edit.id}&{this.props.edit.secret_url}
        </p>
        <p>
          Staff Username:{' '}
          {this.props.edit.name
            .toLowerCase()
            .split(' ')
            .join('')}
        </p>
        <p>
          Default Password:{' '}
          {this.props.edit.name
            .toLowerCase()
            .split(' ')
            .join('') + '-admin'}
        </p>
        <h3>Change Password</h3>
        <p>
          To change the password, type the default password and the new desired
          password into the text fields below.
        </p>
        <form>
          <input
            value={this.state.defaultPassword}
            onChange={this.handleChangeFor('defaultPassword')}
            placeholder="Default Password"
          />
          <input
            value={this.state.newPassword}
            onChange={this.handleChangeFor('newPassword')}
            placeholder="New Password"
          />

          <h3>Add or Edit Competition</h3>

          <input
            value={this.state.name}
            onChange={this.handleChangeFor('name')}
            placeholder={this.props.edit.name}
          />
          <input
            value={this.state.location}
            onChange={this.handleChangeFor('location')}
            placeholder={this.props.edit.location}
          />
        </form>
        <h2>Select Date</h2>
        <DatePicker selected={this.state.date} onChange={this.handleChange} />

        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
          <Button
            // variant="contained"
            // color="primary"
            onClick={() => {
              this.props.deleteCompetition(this.props.edit.id);
            }}
          >
            Delete
          </Button>
        </div>
        {viewItem}
      </div>
    );
  }
}

ViewAdminEditCompetition.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({
  reduxState,
});

export default compose(
  connect(mapStateToProps),
  withRouter,
  withStyles(styles)
)(ViewAdminEditCompetition);
