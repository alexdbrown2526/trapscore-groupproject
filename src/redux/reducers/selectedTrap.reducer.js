import { USER_ACTIONS } from "../actions/userActions";

const selectedTrapReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_SELECTED_TRAP:
      return action.payload;
    default:
      return state;
  }
};

export default selectedTrapReducer;
