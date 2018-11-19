import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { USER_ACTIONS } from '../actions/userActions';

const sagaName = 'submitScoresSaga'

function* submitScores(action) {
  try {
    const response = yield axios.get(`api/competition/scores/`, { params: {id: action.payload}});
    yield put({ type: USER_ACTIONS.SET_CURRENT_ROUND, payload: 1 });
    yield put({ type: USER_ACTIONS.SET_SELECTED_TRAP, payload: response.data });
  } catch (error) {
    console.log('error in', sagaName, ':', error);
  }
}

function* submitScoresSaga() {
  yield takeLatest(USER_ACTIONS.SUBMIT_SCORES, submitScores);
}

export default submitScoresSaga;
