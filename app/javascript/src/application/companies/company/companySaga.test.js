import { call, put, takeEvery, select } from 'redux-saga/effects';
import { loadCompany } from './companyServices';
import companyActions from './companyActions';
import {
  loadCompanyRequestWatcher,
  loadCompanyRequest
} from './companySaga';
import companyData from './companyData';

describe('stocks saga -> loadCompanyRequestWatcher', () => {
  const loadCompanyRequestWatcherGen = loadCompanyRequestWatcher();
  it('should act on every LOAD_COMPANY_REQUEST action', () => {
    expect(loadCompanyRequestWatcherGen.next().value).toEqual(
      takeEvery(companyActions.LOAD_COMPANY_REQUEST, loadCompanyRequest)
    );
  });
});
describe('stocks saga -> loadCompanyRequest', () => {
  const testAction = { symbol: companyData.companies[0].symbol };
  const loadCompanyRequestGen = loadCompanyRequest(testAction);
  it('should call the api', () => {
    expect(loadCompanyRequestGen.next().value).toEqual(
      call(loadCompany, testAction.symbol)
    );
  });
  it('should put LOAD_COMPANY_SUCCESS on success of the api call', () => {
    const testResult = { data: companyData.companies[0] };
    expect(loadCompanyRequestGen.next(testResult).value).toEqual(
      put({
        type: companyActions.LOAD_COMPANY_SUCCESS,
        selectedCompany: testResult.data
      })
    );
  });
  it('should put LOAD_COMPANY_ERROR on an error', () => {
    const testError = { message: 'Could not load company' };
    expect(loadCompanyRequestGen.throw(testError).value).toEqual(
      put({ type: companyActions.LOAD_COMPANY_ERROR, error: 'Could not load company' })
    );
  });
});
