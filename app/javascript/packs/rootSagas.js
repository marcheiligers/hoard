import { all } from "redux-saga/effects";
import writersSaga from "./writers/writersSaga";

export default function* rootSaga(getState) {
  yield all([writersSaga()]);
}
