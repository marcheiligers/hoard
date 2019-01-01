import { all } from "redux-saga/effects";
import writersSaga from "./writers/writersSaga";
import stocksSaga from "./stocks/stocksSaga";

export default function* rootSaga(getState) {
  yield all([writersSaga(), stocksSaga()]);
}
