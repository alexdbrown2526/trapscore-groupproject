import React, { Component } from "react";
import { connect } from "react-redux";

import { LOGIN_ACTIONS } from "../../redux/actions/loginActions";

import { withStyles } from "@material-ui/core/styles";

import { 
  Card, 
  Button, 
  TextField
} from "@material-ui/core/";

import {
  AccountCircle,
  Lock
} from "@material-ui/icons/";


const styles = theme => ({
  adminRegister: {
    fontFamily: "Roboto, sans-serif",
    marginTop: "3%",
    paddingBottom: "10%",
    width: "30%",
    paddingTop: "3%",
    display: "flex",
    overflow: "hidden",
    flexDirection: "column",
    margin: "auto"
  },

  registerButton: {
    marginTop: "4%",
    marginBottom: "4%"
  }
});

class RegisterPage extends Component {
  state = {
    username: "",
    password: ""
  };

  registerUser = event => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: LOGIN_ACTIONS.REGISTER,
        payload: {
          username: this.state.username,
          password: this.state.password
        }
      });
    } else {
      this.props.dispatch({ type: LOGIN_ACTIONS.REGISTRATION_INPUT_ERROR });
    }
  }; // end registerUser

  handleInputChangeFor = propertyName => event => {
    this.setState({
      [propertyName]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.background}>
        {this.props.errors.registrationMessage && (
          <h2 className="alert" role="alert">
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
                    onChange={this.handleInputChangeFor("username")}
                  />
                  <AccountCircle />
                </label>
              </div>
              <div>
                <label htmlFor="password">
                  <TextField
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChangeFor("password")}
                  />
                  <Lock />
                </label>
              </div>
              <div>
                <Button
                  onClick={this.registerUser}
                  variant="contained"
                  className={classes.registerButton}
                  type="submit"
                  name="submit"
                  value="Register"
                >
                  Register
                </Button>

                <br />
                <Button
                  variant="contained"
                  type="button"
                  className={classes.loginButton}
                  onClick={() => {
                    this.props.dispatch({
                      type: LOGIN_ACTIONS.SET_TO_LOGIN_MODE
                    });
                  }}
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

const mapStateToProps = ({ errors }) => ({ errors });

export default withStyles(styles)(connect(mapStateToProps)(RegisterPage));
