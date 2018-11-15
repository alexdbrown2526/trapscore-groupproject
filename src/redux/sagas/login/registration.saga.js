import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { LOGIN_ACTIONS } from "../../actions/loginActions";


// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: LOGIN_ACTIONS.CLEAR_REGISTRATION_ERROR });

    // passes the username and password from the payload to the server
    yield axios.post('api/user/register', action.payload);

    // automatically log a user in after registration
    yield put({ type: LOGIN_ACTIONS.LOGIN, payload: action.payload });
    
    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({type: LOGIN_ACTIONS.SET_TO_LOGIN_MODE});
  } catch (error) {
      console.log('Error with user registration:', error);
      yield put({type: LOGIN_ACTIONS.REGISTRATION_FAILED});
  }
}

function* registrationSaga() {
  yield takeLatest(LOGIN_ACTIONS.REGISTER, registerUser);
}

export default registrationSaga;
