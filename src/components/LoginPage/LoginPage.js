import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LOGIN_ACTIONS } from '../../redux/actions/loginActions';
import { withStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Lock from '@material-ui/icons/Lock'
import Card from '@material-ui/core/Card'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = theme => ({
  loginCard: {
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

  loginButton: {
    marginTop:'4%',
    marginBottom: '4%',
    variant: 'contained'
},


 
    
})

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();
    toast('Welcome to TrapScore!')

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: LOGIN_ACTIONS.LOGIN,
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: LOGIN_ACTIONS.LOGIN_INPUT_ERROR });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
      const {classes} = this.props;

    return (
      <div>  
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <Card className={classes.loginCard}>
        <form onSubmit={this.login}>
        <center>
          <h1>Login</h1>
          <div>
            <label htmlFor="username">
              <TextField
              placeholder="Username"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              /> <AccountCircle />
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
              /> <Lock />
            </label>
          </div>
          <div>
            <Button
            onClick={this.login}
            variant="contained"
            type="submit"
            className={classes.loginButton}>
              Login
            </Button>
            
          </div>
        
          <Button
          variant="contained"
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: LOGIN_ACTIONS.SET_TO_REGISTER_MODE})}}
          >
            Register
          </Button>
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

export default withStyles(styles)(connect(mapStateToProps)(LoginPage));
