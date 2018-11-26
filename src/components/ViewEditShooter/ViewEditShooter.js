import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import { Button, List, ListItem, TextField } from '@material-ui/core/';

const styles = theme => ({
  field: {
    float: 'right',
  },
  saveButton: {
    marginTop: '8%',
  },

  editHeader: {
    marginLeft: '7%',
  },

  editform: {
    float: 'right',
    marginRight: '10%',
    marginTop: '.125vh',
    borderStyle: 'solid',
    padding: '20px',
    fontFamily: 'Roboto, sans-serif',
    height: '83vh',
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
    if (this.props !== prevProps) {
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
        <h2 className={classes.editHeader}>Edit Shooter</h2>
        <hr></hr>

          <List dense>
            <ListItem>
              <TextField
                label="First Name"
                className="textfield"
                type="text"
                name="searchText"
                value={this.state.first_name}
                onChange={this.handleChangeFor('first_name')}
              />
            </ListItem>
            <ListItem>
              <TextField
                label="Last Name"
                className="textfield"
                type="text"
                name="searchText"
                value={this.state.last_name}
                onChange={this.handleChangeFor('last_name')}
              />
            </ListItem>
            <ListItem>
              <TextField
                label="E-mail"
                className="textfield"
                type="text"
                name="searchText"
                value={this.state.email}
                onChange={this.handleChangeFor('email')}
              />
            </ListItem>
            <ListItem>
              <TextField
                label="Phone Number"
                className="textfield"
                type="text"
                name="searchText"
                value={this.state.phone}
                onChange={this.handleChangeFor('phone')}
              />
            </ListItem>
            <ListItem>
              <TextField
                label="Handicap"
                className="textfield"
                type="text"
                name="searchText"
                value={this.state.handicap}
                onChange={this.handleChangeFor('handicap')}
              />
            </ListItem>
            <ListItem>
              <TextField
                label="ATA Number"
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
