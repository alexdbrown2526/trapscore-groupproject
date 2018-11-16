

const test = (state = [{id: 11, name: "Squad 11",}], action) => {
    switch (action.type) {
      case 'SET_TEST_DATA':
        return action.payload;
      default:
        return state;
    }
  };


  
  export default test;