import { USER_ACTIONS } from "../actions/userActions";

const schedulingDataReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_SCHEDULING_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default schedulingDataReducer;
