import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { USER_ACTIONS } from '../actions/userActions';

const sagaName = 'schedulingDataSaga'

function* fetchSchedulingData() {
  try {
    const response = yield axios.get('api/competition/scheduling');

    yield put({ type: USER_ACTIONS.SET_SCHEDULING_DATA, payload: response.data });
  } catch (error) {
    console.log('error in', sagaName, ':', error);
  }
}

function* schedulingDataSaga() {
  yield takeLatest(USER_ACTIONS.FETCH_SCHEDULING_DATA, fetchSchedulingData);
}

export default schedulingDataSaga;
