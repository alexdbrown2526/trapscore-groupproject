import { USER_ACTIONS } from "../actions/userActions";

const shootersReducer = (state = [], action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_SHOOTERS:
      return action.payload;
    default:
      return state;
  }
};


export default shootersReducer;
