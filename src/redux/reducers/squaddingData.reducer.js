import { USER_ACTIONS } from "../actions/userActions";

const squaddingDataReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_SQUADDING_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default squaddingDataReducer;
