import { takeEvery, call, all, fork, put } from 'redux-saga/effects';
import companyActions from './companyActions';
import { loadCompany } from './companyServices';

export function* loadCompanyRequestWatcher() {
  yield takeEvery(companyActions.LOAD_COMPANY_REQUEST, loadCompanyRequest);
}

export function* loadCompanyRequest(action) {
  try {
    const result = yield call(loadCompany, action.symbol);
    yield put({
      type: companyActions.LOAD_COMPANY_SUCCESS,
      selectedCompany: result.data
    });
  } catch (err) {
    yield put({
      type: companyActions.LOAD_COMPANY_ERROR,
      error: 'Could not load company'
    });
  }
}

export default function* companySaga() {
  yield all([fork(loadCompanyRequestWatcher)]);
}