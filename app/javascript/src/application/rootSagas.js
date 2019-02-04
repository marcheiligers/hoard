import { all } from "redux-saga/effects";
import stocksSaga from "./stocks/stocksSaga";
import companySaga from "./companies/company/companySaga";

export default function* rootSaga(getState) {
  yield all([stocksSaga(), companySaga()]);
}
