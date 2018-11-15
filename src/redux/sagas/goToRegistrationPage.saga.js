import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { USER_ACTIONS } from '../actions/userActions';

const sagaName = 'goToRegistrationPageSaga';

function* goToRegistrationPage(action) {
  try {
    // on the Nav page, we passed props.history in as the payload, here we use it to navigate
    // get the secret url from the server
    const response = yield axios.get('api/competition/secret/');
    const secretUrl = response.data[0].secret_url;
    const competitionId = response.data[0].id;
    // send a log out action
    yield put({ type: USER_ACTIONS.LOGOUT });
    // navigate to the secret url
    action.payload.push(`/registration/${competitionId}&${secretUrl}`);
  } catch (error) {
    console.log('error in', sagaName, ':', error);
  }
}

function* goToRegistrationPageSaga() {
  yield takeLatest(USER_ACTIONS.GO_TO_REGISTRATION_PAGE, goToRegistrationPage);
}

export default goToRegistrationPageSaga;
