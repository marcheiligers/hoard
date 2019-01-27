import { call, put, takeEvery, select } from 'redux-saga/effects';
import { loadStocks, loadStock } from './stocksServices';
import stocksActions from './stocksActions';
import {
  loadStocksRequestWatcher,
  loadStocksRequest,
  loadStockRequestWatcher,
  loadStockRequest
} from './stocksSaga';
import data from './stocksData';

describe('stocks saga -> loadsStocksRequestWatcher', () => {
  const loadStocksRequestWatcherGen = loadStocksRequestWatcher();
  it('should act on every LOAD_STOCKS_REQUEST action', () => {
    expect(loadStocksRequestWatcherGen.next().value).toEqual(
      takeEvery(stocksActions.LOAD_STOCKS_REQUEST, loadStocksRequest)
    );
  });
});
describe('stocks saga -> loadStocksRequest', () => {
  const loadStocksRequestGen = loadStocksRequest();
  it('should call the api', () => {
    expect(loadStocksRequestGen.next().value).toEqual(call(loadStocks));
  });
  it('should put LOAD_STOCKS_SUCCESS on success of the api call', () => {
    const testResult = { data: [] };
    expect(loadStocksRequestGen.next(testResult).value).toEqual(
      put({ type: stocksActions.LOAD_STOCKS_SUCCESS, stocks: testResult.data })
    );
  });
  it('should put LOAD_STOCKS_ERROR action on an error', () => {
    const testError = new Error('Error');
    expect(loadStocksRequestGen.throw(testError).value).toEqual(
      put({ type: stocksActions.LOAD_STOCKS_ERROR, error: testError })
    );
  });
});
describe('stocks saga -> loadStockRequestWatcher', () => {
  const loadStockRequestWatcherGen = loadStockRequestWatcher();
  it('should act on every LOAD_STOCK_REQUEST action', () => {
    expect(loadStockRequestWatcherGen.next().value).toEqual(
      takeEvery(stocksActions.LOAD_STOCK_REQUEST, loadStockRequest)
    );
  });
});
describe('stocks saga -> loadStockRequest', () => {
  const testAction = { id: data.stocks[0].id };
  const loadStockRequestGen = loadStockRequest(testAction);
  it('should call the api', () => {
    expect(loadStockRequestGen.next().value).toEqual(
      call(loadStock, testAction.id)
    );
  });
  it('should put LOAD_STOCK_SUCCESS on success of the api call', () => {
    const testResult = { data: data.stocks[0] };
    expect(loadStockRequestGen.next(testResult).value).toEqual(
      put({
        type: stocksActions.LOAD_STOCK_SUCCESS,
        selectedStock: testResult.data
      })
    );
  });
  it('should put LOAD_STOCK_ERROR on an error', () => {
    const testError = { message: 'Could not load stock' };
    expect(loadStockRequestGen.throw(testError).value).toEqual(
      put({ type: stocksActions.LOAD_STOCK_ERROR, error: 'Could not load stock' })
    );
  });
});
