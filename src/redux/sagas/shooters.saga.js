import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { USER_ACTIONS } from '../actions/userActions';

const sagaName = 'shootersSaga'

function* fetchShooters() {
  try {
    const response = yield axios.get('api/competition/shooters');

    yield put({ type: USER_ACTIONS.SET_SHOOTERS, payload: response.data });
  } catch (error) {
    console.log('error in', sagaName, ':', error);
  }
}

function* shootersSaga() {
  yield takeLatest(USER_ACTIONS.FETCH_SHOOTERS, fetchShooters);
}

export default shootersSaga;
