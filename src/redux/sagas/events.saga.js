import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

const sagaName = 'eventsSaga'

function* fetchEvents() {
  try {
    const response = yield axios.get('api/competition/event');

    yield put({ type: 'SET_EVENTS', payload: response.data });
  } catch (error) {
    console.log('error in', sagaName, ':', error);
  }
}

function* eventsSaga() {
  yield takeLatest('FETCH_EVENTS', fetchEvents);
}

export default eventsSaga;
