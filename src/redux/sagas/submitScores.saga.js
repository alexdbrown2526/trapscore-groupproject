import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { USER_ACTIONS } from '../actions/userActions';

const sagaName = 'submitScoresSaga'

function* submitScores(action) {
  try {
    const response = yield axios.post(`api/competition/scores/`, action.payload );
    yield put({ type: USER_ACTIONS.FETCH_SELECTED_TRAP, payload: action.payload.trap.id});
  } catch (error) {
    console.log('error in', sagaName, ':', error);
  }
}

function* submitScoresSaga() {
  yield takeLatest(USER_ACTIONS.SUBMIT_SCORES, submitScores);
}

export default submitScoresSaga;
