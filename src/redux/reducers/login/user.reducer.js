import { LOGIN_ACTIONS } from "../../actions/loginActions";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_ACTIONS.SET_USER:
      return action.payload;
    case  LOGIN_ACTIONS.UNSET_USER:
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userReducer;
