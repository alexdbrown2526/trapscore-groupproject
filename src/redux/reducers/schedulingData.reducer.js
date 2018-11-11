const schedulingDataReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SCHEDULING_DATA':
      return action.payload;
    default:
      return state;
  }
};

export default schedulingDataReducer;
