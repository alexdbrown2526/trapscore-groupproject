import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { USER_ACTIONS } from '../actions/userActions';

const sagaName = 'eventsSaga'

function* fetchEvents() {
  try {
    const response = yield axios.get('api/competition/event');

    yield put({ type: USER_ACTIONS.SET_EVENTS, payload: response.data });
  } catch (error) {
    console.log('error in', sagaName, ':', error);
  }
}

function* eventsSaga() {
  yield takeLatest(USER_ACTIONS.FETCH_EVENTS, fetchEvents);
}

export default eventsSaga;
