import { call, put, takeEvery, select } from 'redux-saga/effects';
import { loadStocks, loadStock, addStock, deleteStock, updateStock } from './stocksServices';
import stocksActions from './stocksActions';
import {
  loadStocksRequestWatcher,
  loadStocksRequest,
  loadStockRequestWatcher,
  loadStockRequest,
  addStockRequestWatcher,
  addStockRequest,
  deleteStockRequestWatcher,
  deleteStockRequest,
  updateStockRequestWatcher,
  updateStockRequest
} from './stocksSaga';
import data, { newStock } from './stocksData';
// TODO: add tests for adding a stock
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
      put({ type: stocksActions.LOAD_STOCK_ERROR, error: testError.message })
    );
  });
});
describe('stocks saga -> addStockRequestWatcher', () => {
  const addStockRequestWatcherGen = addStockRequestWatcher();
  it('should act on every ADD_STOCK_REQUEST action', () => {
    expect(addStockRequestWatcherGen.next().value).toEqual(
      takeEvery(stocksActions.ADD_STOCK_REQUEST, addStockRequest)
    );
  });
});
describe('stocks saga -> addStockRequest', () => {
  const testAction = { symbol: newStock.symbol };
  const addStockRequestGen = addStockRequest(testAction);
  it('should call the api', () => {
    expect(addStockRequestGen.next().value).toEqual(
      call(addStock, testAction.symbol)
    );
  });
  it('should put ADD_STOCK_SUCCESS on success of the api call', () => {
    const testResult = { data: newStock };
    expect(addStockRequestGen.next(testResult).value).toEqual(
      put({
        type: stocksActions.ADD_STOCK_SUCCESS,
        newStock: testResult.data
      })
    );
  });
  it('should put ADD_STOCK_ERROR on an error from the api call', () => {
    const testError = { message: 'Could not add stock' };
    expect(addStockRequestGen.throw(testError).value).toEqual(
      put({
        type: stocksActions.ADD_STOCK_ERROR,
        error: testError.message
      })
    )
  })
});
describe('stocks saga -> deleteStockRequestWatcher', () => {
  const deleteStockRequestWatcherGen = deleteStockRequestWatcher();
  it('should act on every DELETE_SELECTED_STOCK', () => {
    expect(deleteStockRequestWatcherGen.next().value).toEqual(
      takeEvery(stocksActions.DELETE_STOCK_REQUEST, deleteStockRequest)
    );
  });
});
describe('stocks saga -> deleteStockRequest', () => {
  const testAction = { id: 3 };
  const deleteStockRequestGen = deleteStockRequest(testAction);
  it('should call the api', () => {
    expect(deleteStockRequestGen.next().value).toEqual(
      call(deleteStock, testAction.id)
    );
  });
  it('should put DELETE_STOCK_SUCCESS on success of the api call', () => {
    expect(deleteStockRequestGen.next().value).toEqual(
      put({
        type: stocksActions.DELETE_STOCK_SUCCESS
      })
    );
  });
  it('should put DELETE_STOCK_ERROR on an error from the api', () => {
    const testError = { message: 'Could not delete stock' };
    expect(deleteStockRequestGen.throw(testError).value).toEqual(
      put({
        type: stocksActions.DELETE_STOCK_ERROR,
        error: testError.message
      })
    )
  });
});
describe('stocks saga -> updateStockRequestWatcher', () => {
  const updateStockRequestWatcherGen = updateStockRequestWatcher();
  it('should act on every UPDATE_STOCK_REQUEST', () => {
    expect(updateStockRequestWatcherGen.next().value).toEqual(
      takeEvery(stocksActions.UPDATE_STOCK_REQUEST, updateStockRequest)
    )
  });
});
describe('stocks saga -> updateStockRequest', () => {
  const testStock = { ...data.stocks[0], star: false };
  const testAction = { stock: testStock }
  const updateStockRequestGen = updateStockRequest(testAction);
  it('should call the api', () => {
    expect(updateStockRequestGen.next().value).toEqual(
      call(updateStock, testAction.stock)
    );
  });
  it('should put UPDATE_STOCK_SUCCESS on success of the api call', () => {
    const testResult = { data: testStock };
    expect(updateStockRequestGen.next(testResult).value).toEqual(
      put({
        type: stocksActions.UPDATE_STOCK_SUCCESS,
        updatedStock: testResult.data
      })
    );
  });
  it('should put UPDATE_STOCK_ERROR on an error from the api', () => {
    const testError = { message: 'Could not update stock' };
    expect(updateStockRequestGen.throw(testError).value).toEqual(
      put({
        type: stocksActions.UPDATE_STOCK_ERROR,
        error: testError.message
      })
    )
  })
})
