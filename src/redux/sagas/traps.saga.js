import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { USER_ACTIONS } from "../actions/userActions";


const sagaName = "trapsSaga";

function* fetchTraps() {
  try {



    const response = yield axios.get("api/competition/trap");

    yield put({ type: USER_ACTIONS.SET_TRAPS, payload: response.data });
  } catch (error) {
    console.log("error in", sagaName, ":", error);
  }
}

function* trapsSaga() {
  yield takeLatest(USER_ACTIONS.FETCH_TRAPS, fetchTraps);
}

export default trapsSaga;
