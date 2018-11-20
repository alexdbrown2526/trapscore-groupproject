import React, { Component } from "react";
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = theme => ({   

  field: {
    float: 'right',
    
   },
   saveButton: {
      marginTop: '8%'
   },

  editform: {
    float: 'right',
    marginRight: '20%',
    marginTop: '4%',
    borderStyle: 'solid',
    padding: '20px',
    fontFamily: 'Roboto, sans-serif'
  }
  
});

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

    if(this.state.handicap < 16 || this.state.handicap > 27) {
      toast('Handicap must be between 16 and 27 yards');
      return false
    } else {
      toast('Changes saved')


    }
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
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.editform}>
        <List>
          <ListItem>
          <TextField
            label="First Name"
            className={classes.field}
            type="text"
            name="searchText"
            value={this.state.first_name}
            onChange={this.handleChangeFor("first_name")}
          />
          </ListItem>
          <ListItem>
          <TextField
          label="Last Name"
            className={classes.field}
            type="text"
            name="searchText"
            value={this.state.last_name}
            onChange={this.handleChangeFor("last_name")}
          />
          </ListItem>
          <ListItem>
          <TextField
            label="Email"
            className={classes.field}
            type="text"
            name="searchText"
            value={this.state.email}
            onChange={this.handleChangeFor("email")}
          />
          </ListItem>
          <ListItem>
          <TextField
          label="Phone Number"
            className={classes.field}
            type="text"
            name="searchText"
            value={this.state.phone}
            onChange={this.handleChangeFor("phone")}
          />
          </ListItem>
          <ListItem>
          <TextField
          label="Handicap (yds)"
            className={classes.field}
            type="text"
            name="searchText"
            value={this.state.handicap}
            onChange={this.handleChangeFor("handicap")}
          />
          </ListItem>
          <ListItem>
          <TextField
            label="ATA #"
            className={classes.field}
            type="text"
            name="searchText"
            value={this.state.ata_number}
            onChange={this.handleChangeFor("ata_number")}
          />
          </ListItem>
                <Button className={classes.saveButton} variant="contained" color="primary" onClick={()=>{this.updateUser(this.state.id)}}>Save Changes</Button>
                </List>
        </form>
      
      </div>
    );
  }
}

export default withStyles(styles) (ViewEditShooter);
