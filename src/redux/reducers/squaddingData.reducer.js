const squaddingDataReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SQUADDING_DATA':
      return action.payload;
    default:
      return state;
  }
};

export default squaddingDataReducer;
