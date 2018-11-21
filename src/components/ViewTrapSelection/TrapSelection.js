import React, { Component } from "react";
import { connect } from "react-redux";
import { USER_ACTIONS } from "../../redux/actions/userActions";
import { scoringRoute } from "../../navigationRoutes";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card, Checkbox, TextField } from "@material-ui/core/";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Select, MenuItem } from "@material-ui/core/";

const styles = theme => ({
  selectBox: {
    width: "100%",
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
});

class TrapSelection extends Component {
  state = {
    // Value for dropdown selection
    value: "",
    // Conditional Rendering Variable
    isVisible: false,
    trap: "",
    counter: 0

  };
  // Get available Traps
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_TRAPS });
  }

  handleChangeFor = propertyName => event => {
    toast("Trap Selected");
    this.setState({
      ...this.state,
      [propertyName]: event.target.value,
      counter: 0
    });
  };
  // Conditional Rendering function
  // Dispatch action with payload of selected trap ID
  handleSubmit = event => {
    this.props.dispatch({
      type: USER_ACTIONS.FETCH_SELECTED_TRAP,
      payload: this.state.trap
    });
    event.preventDefault();
    this.setState({
      ...this.state,
      isVisible: !this.state.isVisible,
      trap: ""
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
        <h1>Trap Selection</h1>
        {/* {JSON.stringify(this.state.trap)} */}
        <form onSubmit={this.handleSubmit}>
          <>
            <Select
              className={classes.selectBox}
              value={this.state.trap}
              onChange={this.handleChangeFor("trap")}
            
            >
            <MenuItem value={0}>Select</MenuItem>
              {this.props.traps.map(trap => {
                return (
                  <MenuItem key={trap.id} value={trap.id}>
                    {trap.name}
                  </MenuItem>
                );
              })}
            </Select>
          </>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            name="submit"
            value="Register"
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
  classes: PropTypes.object.isRequired
};

const mapStateToProps = reduxState => ({
  reduxState,
  traps: reduxState.traps,
  user: reduxState.user
});

const Traps = withStyles(styles)(TrapSelection);

export default connect(mapStateToProps)(Traps);
