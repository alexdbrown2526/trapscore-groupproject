import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

const sagaName = "goToRegistrationPageSaga";

function* goToRegistrationPage() {
  try {
    // get the secret url from the server

    // send a log out action
    // navigate to the secret url

    const response = yield axios.get("api/competition/event");

    yield put({ type: "SET_EVENTS", payload: response.data });
  } catch (error) {
    console.log("error in", sagaName, ":", error);
  }
}

function* goToRegistrationPageSaga() {
  yield takeLatest("GO_TO_REGISTRATION_PAGE", goToRegistrationPage);
}

export default goToRegistrationPageSaga;
