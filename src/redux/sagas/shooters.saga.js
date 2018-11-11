import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

const sagaName = 'shootersSaga'

function* fetchShooters() {
  try {
    const response = yield axios.get('api/competition/shooters');

    yield put({ type: 'SET_SHOOTERS', payload: response.data });
  } catch (error) {
    console.log('error in', sagaName, ':', error);
  }
}

function* shootersSaga() {
  yield takeLatest('FETCH_SHOOTERS', fetchShooters);
}

export default shootersSaga;
