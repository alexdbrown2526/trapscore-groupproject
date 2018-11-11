import { combineReducers } from 'redux';
import errors from './login/errors.reducer';
import loginMode from './login/loginMode.reducer';
import user from './login/user.reducer';
import shooters from './shooters.reducer';
import traps from './traps.reducer';
import events from './events.reducer';
import squaddingData from './squaddingData.reducer';
import schedulingData from './schedulingData.reducer';
import selectedTrap from './selectedTrap.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  shooters,
  traps,
  events,
  squaddingData,
  schedulingData,
  selectedTrap,
});

export default rootReducer;
