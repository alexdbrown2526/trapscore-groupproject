import { USER_ACTIONS } from "../actions/userActions";

const trapsReducer = (state = [], action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_TRAPS:
      return action.payload;
    default:
      return state;
  }
};

export default trapsReducer;