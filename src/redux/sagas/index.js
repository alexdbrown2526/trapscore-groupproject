import { all } from "redux-saga/effects";
import loginSaga from "./login/login.saga";
import registrationSaga from "./login/registration.saga";
import userSaga from "./login/user.saga";
import shootersSaga from "./shooters.saga";
import eventsSaga from "./events.saga";
import trapsSaga from "./traps.saga";
import squaddingDataSaga from "./squaddingData.saga";
import schedulingDataSaga from "./schedulingData.saga";
import selectedTrapSaga from "./selectedTrap.saga";
import goToRegistrationPageSaga from "./goToRegistrationPage.saga";

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    shootersSaga(),
    eventsSaga(),
    trapsSaga(),
    squaddingDataSaga(),
    schedulingDataSaga(),
    selectedTrapSaga(),
    goToRegistrationPageSaga(),
  ]);
}
