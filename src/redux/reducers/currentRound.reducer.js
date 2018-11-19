import { USER_ACTIONS } from '../actions/userActions'

const currentRoundReducer = (state = 0, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_CURRENT_ROUND:
      return action.payload;
    default:
      return state;
  }
};

export default currentRoundReducer;
