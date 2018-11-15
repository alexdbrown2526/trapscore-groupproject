import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { USER_ACTIONS } from '../actions/userActions';

const sagaName = 'squaddingDataSaga'

function* fetchSquaddingData() {
  try {
    const response = yield axios.get('api/competition/squadding');

    yield put({ type: USER_ACTIONS.SET_SQUADDING_DATA, payload: response.data });
  } catch (error) {
    console.log('error in', sagaName, ':', error);
  }
}

function* squaddingDataSaga() {
  yield takeLatest(USER_ACTIONS.FETCH_SQUADDING_DATA, fetchSquaddingData);
}

export default squaddingDataSaga;
