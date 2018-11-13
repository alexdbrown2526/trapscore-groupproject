import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

const sagaName = 'selectedTrapSaga'

function* fetchSelectedTrap(action) {
  try {
    const response = yield axios.get(`api/competition/scheduling/${action.payload}`);

    yield put({ type: 'SET_SELECTED_TRAP', payload: response.data });
  } catch (error) {
    console.log('error in', sagaName, ':', error);
  }
}

function* selectedTrapSaga() {
  yield takeLatest('FETCH_SELECTED_TRAP', fetchSelectedTrap);
}

export default selectedTrapSaga;
