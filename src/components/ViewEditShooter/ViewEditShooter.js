import React, { Component } from "react";
import axios from "axios";
import Card from '@material-ui/core/Card'

class ViewEditShooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: this.props.selectedShooter.id,
      first_name: "",
      last_name: "",
      email: "",
      handicap: "",
      phone: "",
      ata_number: ""
    };
  }


  updateUser = () => {
    console.log("update button working");
    axios({
      method: "PUT",
      url: `/api/competition/shooter/${this.state.id}`,
      data: this.state
    }).then((response) => {
        console.log(response);
        this.setState({
        })
        
        
    })
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
        <form className="Edit-Form">
        <Card className="Edit-Card">
          First Name:
          <input
            
            className="textfield"
            type="text"
            name="searchText"
            value={this.state.first_name}
            onChange={this.handleChangeFor("first_name")}
          />
          Last Name:
          <input
            className="textfield"
            type="text"
            name="searchText"
            value={this.state.last_name}
            onChange={this.handleChangeFor("last_name")}
          />
          E-Mail:
          <input
            className="textfield"
            type="text"
            name="searchText"
            value={this.state.email}
            onChange={this.handleChangeFor("email")}
          />
          Phone Number:
          <input
            className="textfield"
            type="text"
            name="searchText"
            value={this.state.phone}
            onChange={this.handleChangeFor("phone")}
          />
          Handicap (yds):
          <input
            className="textfield"
            type="text"
            name="searchText"
            value={this.state.handicap}
            onChange={this.handleChangeFor("handicap")}
          />
          ATA Number:
          <input
            className="textfield"
            type="text"
            name="searchText"
            value={this.state.ata_number}
            onChange={this.handleChangeFor("ata_number")}
          />
                <button onClick={()=>{this.updateUser(this.state.id)}}>Save Changes</button>

        </Card>
        </form>
      
      </div>
    );
  }
}

export default ViewEditShooter;
