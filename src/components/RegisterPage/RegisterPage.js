import React, { Component } from 'react';
import {connect} from 'react-redux';
import { LOGIN_ACTIONS } from '../../redux/actions/loginActions';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Lock from '@material-ui/icons/Lock'



const styles = theme => ({
  adminRegister: {
    fontFamily: 'Roboto, sans-serif',
    marginTop: '3%',
    paddingBottom: '10%',
    width: '30%',
    paddingTop: '3%',
	  display: 'flex',
	  overflow: 'hidden',
	  flexDirection: 'column',
	  margin: 'auto',

},

  registerButton: {
    marginTop:'4%',
    marginBottom: '4%',
  
},

  loginButton: {

  },

 
    
})

class RegisterPage extends Component {

  
  state = {
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: LOGIN_ACTIONS.REGISTER,
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({type: LOGIN_ACTIONS.REGISTRATION_INPUT_ERROR});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <Card className={classes.adminRegister}>
        <form onSubmit={this.registerUser}>
          <center>
          <h1>Register User</h1>
          <div>
            <label htmlFor="username">
              <TextField
              placeholder="Username"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              /><AccountCircle />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              <TextField
              placeholder="Password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              /><Lock/>
            </label>
          </div>
          <div>
            <Button
            onClick={this.registerUser}
            variant="contained"
            className={classes.registerButton}
              type="button"
              name="submit"
              value="Register">
              Register
              
            </Button>
            {/* <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            /> */}
          
        <br/>
          <Button
          variant="contained"
            type="button"
            className={classes.loginButton}
            onClick={() => {this.props.dispatch({type: LOGIN_ACTIONS.SET_TO_LOGIN_MODE})}}
          >
           Back to Login
          </Button>
          </div>
          </center>

        </form>
        </Card>
      </div>
     
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});



 export default withStyles(styles)(connect(mapStateToProps)(RegisterPage));


