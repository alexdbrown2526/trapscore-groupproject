import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { USER_ACTIONS } from '../actions/userActions';

const sagaName = 'selectedTrapSaga'

function* fetchSelectedTrap(action) {
  try {
    const response = yield axios.get(`api/competition/scores/`, { params: {id: action.payload}});
    yield put({ type: USER_ACTIONS.SET_CURRENT_ROUND, payload: 1 });
    yield put({ type: USER_ACTIONS.SET_SELECTED_TRAP, payload: response.data });
  } catch (error) {
    console.log('error in', sagaName, ':', error);
  }
}

function* selectedTrapSaga() {
  yield takeLatest(USER_ACTIONS.FETCH_SELECTED_TRAP, fetchSelectedTrap);
}

export default selectedTrapSaga;
