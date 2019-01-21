import { call, put, takeEvery, select } from 'redux-saga/effects';
import { loadStocks } from './stocksServices';
import stocksActions from './stocksActions';
import { loadStocksRequestWatcher, loadStocksRequest } from './stocksSaga';

describe('stocks saga -> loadsStocksRequestWatcher', () => {
  const loadStocksRequestWatcherGen = loadStocksRequestWatcher();
  it('should act on every LOAD_STOCKS_REQUEST action', () => {
    expect(loadStocksRequestWatcherGen.next().value)
    .toEqual(takeEvery(stocksActions.LOAD_STOCKS_REQUEST, loadStocksRequest));
  });
});
describe('stocks saga -> loadStocksRequest', () => {
  const loadStocksRequestGen = loadStocksRequest();
  it('should call the api', () => {
    expect(loadStocksRequestGen.next().value)
    .toEqual(call(loadStocks));
  });
  it('should put LOAD_STOCKS_SUCCESS on success of the api call', () => {
    const testResult = { data: [] };
    expect(loadStocksRequestGen.next(testResult).value)
    .toEqual(put({ type: stocksActions.LOAD_STOCKS_SUCCESS, stocks: testResult.data }));
  });
  it('should put LOAD_STOCKS_ERROR action on an error', () => {
    const testError = new Error('Error');
    expect(loadStocksRequestGen.throw(testError).value)
    .toEqual(put({ type: stocksActions.LOAD_STOCKS_ERROR, error: testError }));
  });
});
