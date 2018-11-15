import { LOGIN_ACTIONS } from "../../actions/loginActions";

const loginMode = (state = 'login', action) => {
    switch (action.type) {
      case LOGIN_ACTIONS.SET_TO_LOGIN_MODE:
        return 'login';
      case LOGIN_ACTIONS.SET_TO_REGISTER_MODE:
        return 'register';
      default:
        return state;
    }
  };

// loginMode will be on the redux state at:
// state.loginMode
  export default loginMode;
  