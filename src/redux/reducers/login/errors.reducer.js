import { combineReducers } from 'redux';
import { LOGIN_ACTIONS } from "../../actions/loginActions";

// loginMessage holds the string that will display
// on the login screen if there's an error
const loginMessage = (state = '', action) => {
  switch (action.type) {
    case LOGIN_ACTIONS.CLEAR_LOGIN_ERROR:
      return '';
    case LOGIN_ACTIONS.LOGIN_INPUT_ERROR:
      return 'Enter your username and password!';
    case LOGIN_ACTIONS.LOGIN_FAILED:
      return 'Oops! The username and password didn\'t match. Try again!';
    case LOGIN_ACTIONS.LOGIN_FAILED_NO_CODE:
      return 'Oops! Something went wrong! Is the server running?';
    default:
      return state;
  }
};

// registrationMessage holds the string that will display
// on the registration screen if there's an error
const registrationMessage = (state = '', action) => {
  switch (action.type) {
    case LOGIN_ACTIONS.CLEAR_REGISTRATION_ERROR:
      return '';
    case LOGIN_ACTIONS.REGISTRATION_INPUT_ERROR:
      return 'Choose a username and password!';
    case LOGIN_ACTIONS.REGISTRATION_FAILED:
      return 'Oops! That didn\'t work. The username might already be taken. Try again!';
    default:
      return state;
  }
};

// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
  loginMessage,
  registrationMessage,
});
