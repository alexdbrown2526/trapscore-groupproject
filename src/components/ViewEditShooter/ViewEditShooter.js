import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import { toast } from 'react-toastify';
import { timingSafeEqual } from 'crypto';

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
    fontFamily: 'Roboto, sans-serif',
  },
});

class ViewEditShooter extends Component {
  initialState = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    handicap: '',
    phone: '',
    ata_number: '',
  };
  state = this.initialState;

  clearEdit = () => {
    this.setState(this.initialState);
  };

  handleChangeFor = propertyName => event => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value,
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props != prevProps) {
      this.setState({
        ...this.props.selectedShooter,
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
              First Name:
              <TextField
                className="textfield"
                type="text"
                name="searchText"
                value={this.state.first_name}
                onChange={this.handleChangeFor('first_name')}
              />
            </ListItem>
            <ListItem>
              Last Name:
              <TextField
                className="textfield"
                type="text"
                name="searchText"
                value={this.state.last_name}
                onChange={this.handleChangeFor('last_name')}
              />
            </ListItem>
            <ListItem>
              E-Mail:
              <TextField
                className="textfield"
                type="text"
                name="searchText"
                value={this.state.email}
                onChange={this.handleChangeFor('email')}
              />
            </ListItem>
            <ListItem>
              Phone Number:
              <TextField
                className="textfield"
                type="text"
                name="searchText"
                value={this.state.phone}
                onChange={this.handleChangeFor('phone')}
              />
            </ListItem>
            <ListItem>
              Handicap (yds):
              <TextField
                className="textfield"
                type="text"
                name="searchText"
                value={this.state.handicap}
                onChange={this.handleChangeFor('handicap')}
              />
            </ListItem>
            <ListItem>
              ATA Number:
              <TextField
                className="textfield"
                type="text"
                name="searchText"
                value={this.state.ata_number}
                onChange={this.handleChangeFor('ata_number')}
              />
            </ListItem>
          </List>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              this.props.updateUser(this.state.id, this.state);
              this.clearEdit();
            }}
          >
            Save Changes
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              this.props.deleteShooter(this.state.id);
              this.clearEdit();
            }}
          >
            Delete Shooter
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(ViewEditShooter);
