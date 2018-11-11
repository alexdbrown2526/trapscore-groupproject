const trapsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TRAPS':
      return action.payload;
    default:
      return state;
  }
};

export default trapsReducer;