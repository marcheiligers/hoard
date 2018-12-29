import { takeEvery, call, all, fork, put } from "redux-saga/effects";
import writersActions from "./writersActions";
import { loadWriters } from "./writersServices";

export function* loadWritersRequestWatcher() {
  yield takeEvery(writersActions.LOAD_WRITERS_REQUEST, loadWritersRequest);
}

export function* loadWrtiersRequest() {
  try {
    const results = yield call(loadWriters);
    yield put({
      type: writersActions.LOAD_WRITERS_SUCCESS,
      writers: results.data
    });
  } catch (err) {
    yield put({ type: writersActions.LOAD_WRITERS_ERROR, error: err });
  }
}
export default function* rootSaga() {
  yield all([fork(loadWritersRequestWatcher)]);
}
