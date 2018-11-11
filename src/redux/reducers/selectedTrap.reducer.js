const selectedTrapReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_TRAP':
      return action.payload;
    default:
      return state;
  }
};

export default selectedTrapReducer;
