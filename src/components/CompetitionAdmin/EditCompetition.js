import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { connect } from "react-redux";

class EditCompetition extends Component {
  state = {
    id: this.props.edit,
    date: "",
    name: "",
    location: "",
    defaultPassword: "",
    newPassword: ""
  };

  handleChangeFor = propertyName => event => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
    });
  };

  handleChange = date => {
    this.setState({
      date: date
    });
  };

  handleSubmit = event => {
    alert('Are you sure you want to submit?')
    event.preventDefault();
    const body = {
      id: this.props.edit,
      date: this.state.date,
      name: this.state.name,
      location: this.state.location
    };

    axios({
      method: "PUT",
      url: `/api/competition/`,
      data: body
    }).then(response => {
      console.log(response);
      this.setState({
        ...this.state,
        id: '',
        date: '',
        name: '',
        location: ''
      });
    });
  };

  render() {
    return (
                    
      <div>
        
        <h1>Edit Competition</h1>
        {JSON.stringify(this.props.edit)}
      
        <h2>{this.state.name} Competition</h2>
        <h3>Shareable Registration URL: [url]</h3>
        <p>Staff Username: {this.state.name} Competition</p>
        <p>The default password is the name of the competition and "admin".</p>
        <h3>Change Password</h3>
        <p>
          To change the password, type the default password and the new desired
          password into the text fields below.
        </p>
        <form>
          <input
            value={this.state.defaultPassword}
            onChange={this.handleChangeFor("defaultPassword")}
            placeholder="Default Password"
          />
          <input
            value={this.state.newPassword}
            onChange={this.handleChangeFor("newPassword")}
            placeholder="New Password"
          />

          <h3>Add New Competition</h3>

          <input
            value={this.state.name}
            onChange={this.handleChangeFor("name")}
            placeholder="Name"
          />
          <input
            value={this.state.location}
            onChange={this.handleChangeFor("location")}
            placeholder="Location"
          />
        </form>
        <h2>Select Date</h2>
        <DatePicker selected={this.state.date} onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState
});

export default connect(mapStateToProps)(EditCompetition);

