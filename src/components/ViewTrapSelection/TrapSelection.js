import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  Button,
  Select,
  MenuItem,
  Typography,
  ListItem,
} from '@material-ui/core/';

import { scoringRoute } from '../../navigationRoutes';

import { toast } from 'react-toastify';

const styles = theme => ({
  selectBox: {
    width: '100%',
    paddingTop: '20vw',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    height: '40%',
  },
  centerButtonFixed: {
    position: 'fixed',
    left: '50%',
    bottom: theme.spacing.unit * 2,
    transform: `translate(-50%, 0%)`,
    width: '85%',
  },
  header: {
    textAlign: 'center',
  },
  headerFour: {
    paddingTop: '10vw',
    textAlign: 'center',
  },
});

class TrapSelection extends Component {
  state = {
    // Value for dropdown selection
    value: '',
    // Conditional Rendering Variable
    isVisible: false,
    trap: '',
    counter: 0,
  };
  // Get available Traps
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_TRAPS });
  }

  handleChangeFor = propertyName => event => {
    toast('Trap Selected');
    this.setState({
      ...this.state,
      [propertyName]: event.target.value,
      counter: 0,
    });
  };
  // Conditional Rendering function
  // Dispatch action with payload of selected trap ID
  handleSubmit = event => {
    this.props.dispatch({
      type: USER_ACTIONS.FETCH_SELECTED_TRAP,
      payload: this.state.trap,
    });
    event.preventDefault();
    this.setState({
      ...this.state,
      isVisible: !this.state.isVisible,
      trap: '',
    });
  };

  render() {
    // Conditonal Rendering if statement
    let displayItem;
    if (this.state.isVisible) {
      displayItem = this.props.history.push(scoringRoute);
    }
    const { classes } = this.props;
    return (
      <div>
        <Typography className={classes.header} variant="h4">
          Select A Trap
        </Typography>
        <Typography className={classes.headerFour} variant="h6">
          Click below to select a trap.
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <ListItem>
            <>
              <Select
                className={classes.selectBox}
                value={this.state.trap}
                onChange={this.handleChangeFor('trap')}
              >
                {this.props.traps.map(trap => {
                  return (
                    <MenuItem key={trap.id} value={trap.id}>
                      {trap.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </>
          </ListItem>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            name="submit"
            value="Register"
            className={classes.centerButtonFixed}
          >
            Confirm
          </Button>
          {displayItem}
        </form>
      </div>
    );
  }
}

TrapSelection.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({
  reduxState,
  traps: reduxState.traps,
  user: reduxState.user,
});

const Traps = withStyles(styles)(TrapSelection);

export default connect(mapStateToProps)(Traps);
