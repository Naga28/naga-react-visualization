// import { takeEvery, call } from 'redux-saga/effects';
// import { toast } from 'react-toastify';
// import { actions as WeatherActions, ApiErrorAction } from './weatherreducer';
// import { PayloadAction } from 'redux-starter-kit';

// function* apiErrorReceived(action: PayloadAction<ApiErrorAction>) {
//   yield call(toast.error, `Error Received: ${action.payload.error}`);
// }

// export default function* watchApiError() {
//   yield takeEvery(WeatherActions.weatherApiErrorReceived.type, apiErrorReceived);
// }

import { takeEvery, call } from "redux-saga/effects";
import * as actions from "../store/actions";
import { toast } from "react-toastify";

function* apiErrorReceived(action) {
  yield call(toast.error, `Error Received: ${action.error}`);
}

function* watchApiError() {
  yield takeEvery(actions.API_ERROR, apiErrorReceived);
}

export default [watchApiError];