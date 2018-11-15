import { USER_ACTIONS } from '../actions/userActions'

const eventsReducer = (state = [], action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_EVENTS:
      return action.payload;
    default:
      return state;
  }
};

export default eventsReducer;
