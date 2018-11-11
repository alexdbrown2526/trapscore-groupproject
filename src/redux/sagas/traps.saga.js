import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

const sagaName = 'trapsSaga'

function* fetchTraps() {
  try {
    const response = yield axios.get('api/competition/trap');

    yield put({ type: 'SET_TRAPS', payload: response.data });
  } catch (error) {
    console.log('error in', sagaName, ':', error);
  }
}

function* trapsSaga() {
  yield takeLatest('FETCH_TRAPS', fetchTraps);
}

export default trapsSaga;
