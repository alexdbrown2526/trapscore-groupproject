const shootersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SHOOTERS':
      return action.payload;
    default:
      return state;
  }
};


export default shootersReducer;
