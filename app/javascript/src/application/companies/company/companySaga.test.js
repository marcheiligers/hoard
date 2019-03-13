import { call, put, takeEvery, select } from 'redux-saga/effects';
import { loadCompany, loadCompanyChartData } from './companyServices';
import companyActions from './companyActions';
import {
  loadCompanyRequestWatcher,
  loadCompanyRequest,
  loadCompanyChartDataRequestWatcher,
  loadCompanyChartDataRequest
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
describe('stocks saga -> loadCompanyChartDataRequestWatcher', () => {
  const loadCompanyChartDataRequestWatcherGen = loadCompanyChartDataRequestWatcher();
  it('should act on every LOAD_COMPANY_CHART_DATA_REQUEST action', () => {
    expect(loadCompanyChartDataRequestWatcherGen.next().value).toEqual(
      takeEvery(companyActions.LOAD_COMPANY_CHART_DATA_REQUEST, loadCompanyChartDataRequest)
    );
  });
});
describe('stocks saga -> loadCompanyChartDataRequest', () => {
  const testAction = { symbol: companyData.companies[0].symbol, dateRange: '1d' };
  const loadCompanyChartDataRequestGen = loadCompanyChartDataRequest(testAction);
  it('should call the api', () => {
    expect(loadCompanyChartDataRequestGen.next().value).toEqual(
      call(loadCompanyChartData, testAction.symbol, testAction.dateRange)
    );
  });
  it('should put LOAD_COMPANY_CHART_DATA_SUCCESS on success of the api call', () => {
    const testResult = { data: companyData.stockDataForOneDay };
    expect(loadCompanyChartDataRequestGen.next(testResult).value).toEqual(
      put({
        type: companyActions.LOAD_COMPANY_CHART_DATA_SUCCESS,
        chartData: testResult.data
      })
    );
  });
  it('should put LOAD_COMPANY_CHART_DATA_ERROR on an error', () => {
    const testError = { message: 'Could not fetch chart data' };
    expect(loadCompanyChartDataRequestGen.throw(testError).value).toEqual(
      put({ type: companyActions.LOAD_COMPANY_CHART_DATA_ERROR, error: 'Could not fetch chart data' })
    );
  });
});
