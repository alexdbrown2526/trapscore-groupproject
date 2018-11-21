import { USER_ACTIONS } from "../actions/userActions";
const defaultState = {
  squad_trap: {
    current_rotation: 0,
  },
  shooters: [{ shots: [null] }]
};

const selectedTrapReducer = (state = defaultState, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_SELECTED_TRAP:
      return action.payload;
    case USER_ACTIONS.SET_SHOT:
      // console.log(action.payload);
      let tempShooters = [...state.shooters];
      // console.log(tempShooters);
      tempShooters[action.payload.index].shots[action.payload.round - 1] =
        action.payload.score;
      // console.log('Shooters',tempShooters);
      // console.log('Score',tempShooters[action.payload.index].shots[action.payload.round]);

      return { ...state, shooters: tempShooters };

    default:
      return state;
  }
};

export default selectedTrapReducer;
