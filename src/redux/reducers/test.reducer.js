
const MembersArray = [{id: 44, first_name: "Ira", last_name: "Fletcher", handicap: 38, post_position: 5}, 
                    {id: 47, first_name: "Sam", last_name: "Johnson", handicap: 27, post_position: 4},
                    {id: 36, first_name: "Chris", last_name: "Lisac", handicap: 56, post_position: 3},
                    {id: 47, first_name: "Ozzy", last_name: "Osbourne", handicap: 100, post_position: 2},
                    {id: 66, first_name: "Thomas", last_name: "Pridgen", handicap: 1, post_position: 1}]

const test = (state = [{id: 11, name: "Squad 11",}], action) => {
    switch (action.type) {
      case 'SET_TEST_DATA':
        return action.payload;
      default:
        return state;
    }
  };


  
  export default test;