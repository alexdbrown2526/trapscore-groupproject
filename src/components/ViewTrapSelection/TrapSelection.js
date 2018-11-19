import React, { Component } from "react";
import { connect } from "react-redux";
import { USER_ACTIONS } from "../../redux/actions/userActions";
import { scoringRoute } from '../../navigationRoutes';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class TrapSelection extends Component {
  state = {
    // Value for dropdown selection
    value: "",
    // Conditional Rendering Variable
    isVisible: false,
    trap: ""
  };
  // Get available Traps
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_TRAPS });
  }

  handleChangeFor = propertyName => event => {
    toast('Trap Selected')
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
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
    return (
      <div>
        <h1>Trap Selection</h1>
        {/* {JSON.stringify(this.state.trap)} */}
        <form onSubmit={this.handleSubmit}>
          <label>
            <select onChange={this.handleChangeFor("trap")}>
              <option>Select Trap</option>
              {this.props.traps.map(trap => {
                return (
                  // value={trap id} gets the id of selected trap to be passed to the saga, saga triggers axios get call to return name and id.
                  <option key={trap.id} value={trap.id}>
                    {trap.name}
                  </option>
                );
              })}
            </select>
          </label>
          <input type="submit" value="Confirm" />
        </form>
        {displayItem}
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
  traps: reduxState.traps,
  user: reduxState.user
});

export default connect(mapStateToProps)(TrapSelection);
