import React, { Component } from "react";
import axios from "axios";

class ViewEditShooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      handicap: "",
      phone: "",
      ata_number: ""
    };
  }

  updateUser = id => {
    console.log("update button working");
    axios({
      method: "PUT",
      url: `/api/competition/shooter/${id}`
      // data: updatedUserInfo
    });
  };

  handleChangeFor = propertyName => event => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props != prevProps) {
      this.setState({
        ...this.props.selectedShooter
      });
    }
  }

  render() {
    return (
      <div>
        <form className="form">
          <input
            className="textfield"
            type="text"
            name="searchText"
            value={this.state.first_name}
            onChange={this.handleChangeFor("first_name")}
          />
          <input
            className="textfield"
            type="text"
            name="searchText"
            value={this.state.last_name}
            onChange={this.handleChangeFor("last_name")}
          />
          <input
            className="textfield"
            type="text"
            name="searchText"
            value={this.state.email}
            onChange={this.handleChangeFor("email")}
          />
          <input
            className="textfield"
            type="text"
            name="searchText"
            value={this.state.phone}
            onChange={this.handleChangeFor("phone")}
          />
          <input
            className="textfield"
            type="text"
            name="searchText"
            value={this.state.handicap}
            onChange={this.handleChangeFor("handicap")}
          />
          <input
            className="textfield"
            type="text"
            name="searchText"
            value={this.state.ata_number}
            onChange={this.handleChangeFor("ata_number")}
          />
        </form>
        {/* // <ul>
                //     <li>
                //         {JSON.stringify(this.props.selectedShooter[0])}
                //         {this.props.selectedShooter.first_name}
                //     </li>
                //     <li>
                //         {this.props.selectedShooter.last_name}
                //     </li>
                //     <li>
                //         {this.props.selectedShooter.email}
                //     </li>
                //     <li>
                //         {this.props.selectedShooter.phone}
                //     </li>
                //     <li>
                //         {this.props.selectedShooter.handicap}
                //     </li>
                //     <li>
                //         {this.props.selectedShooter.ata_number}
                //     </li>
                // </ul> */}
        <button onClick={this.updateUser}>Save Changes</button>
      </div>
    );
  }
}

export default ViewEditShooter;
