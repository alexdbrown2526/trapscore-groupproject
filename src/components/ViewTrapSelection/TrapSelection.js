import React, { Component } from "react";
import { connect } from 'react-redux';

class TrapSelection extends Component {
  state = {
    value: "",
    isVisible: false
  };

  // TODO: Populate dropdown with DB traps, Map through tomorrow.


  componentDidMount() {
    this.props.dispatch({ type:'FETCH_TRAPS', payload: ''});
 }

  handleChangeFor = propertyName => event => {
    this.setState({
        ...this.state,
        [propertyName]: event.target.value
    });
};

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      isVisible: !this.state.isVisible
    });
  }

  render() {
    let displayItem;
    if (this.state.isVisible) {
      displayItem = this.props.history.push("/scoring");
    }
    return (
      <div>
        <h1>Trap Selection</h1>

        <form onSubmit={this.handleSubmit}>
          <label>
            <select onChange={this.handleChangeFor('propertyName')}>
              <option value="Trap One">Trap One</option>
              <option value="Trap Two">Trap Two</option>
              <option value="Trap Three">Trap Three</option>
              <option value="Trap Four">Trap Four</option>
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
});

export default connect(mapStateToProps)(TrapSelection);