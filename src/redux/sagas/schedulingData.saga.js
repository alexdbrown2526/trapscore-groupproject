import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

const sagaName = 'schedulingDataSaga'

function* fetchSchedulingData() {
  try {
    const response = yield axios.get('api/competition/scheduling');

    yield put({ type: 'SET_SCHEDULING_DATA', payload: response.data });
  } catch (error) {
    console.log('error in', sagaName, ':', error);
  }
}

function* schedulingDataSaga() {
  yield takeLatest('FETCH_SCHEDULING_DATA', fetchSchedulingData);
}

export default schedulingDataSaga;
