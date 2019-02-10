import { takeEvery, call, all, fork, put } from 'redux-saga/effects';
import stocksActions from './stocksActions';
import { loadStocks, loadStock, addStock, deleteStock } from './stocksServices';

export function* loadStocksRequestWatcher() {
  yield takeEvery(stocksActions.LOAD_STOCKS_REQUEST, loadStocksRequest);
}

export function* loadStocksRequest() {
  try {
    const results = yield call(loadStocks);
    yield put({
      type: stocksActions.LOAD_STOCKS_SUCCESS,
      stocks: results.data
    });
  } catch (err) {
    yield put({ type: stocksActions.LOAD_STOCKS_ERROR, error: err });
  }
}

export function* loadStockRequestWatcher() {
  yield takeEvery(stocksActions.LOAD_STOCK_REQUEST, loadStockRequest);
}

export function* loadStockRequest(action) {
  try {
    const result = yield call(loadStock, action.id);
    yield put({
      type: stocksActions.LOAD_STOCK_SUCCESS,
      selectedStock: result.data
    });
  } catch (err) {
    yield put({
      type: stocksActions.LOAD_STOCK_ERROR,
      error: 'Could not load stock'
    });
  }
}

export function* addStockRequestWatcher() {
  yield takeEvery(stocksActions.ADD_STOCK_REQUEST, addStockRequest);
}

export function* addStockRequest(action) {
  try {
    const result = yield call(addStock, action.symbol);
    // TODO: Add redux actions and react component for modal notifications.
    yield put({
      type: stocksActions.ADD_STOCK_SUCCESS,
      newStock: result.data
    });
  } catch (err) {
    yield put({
      type: stocksActions.ADD_STOCK_ERROR,
      error: 'Could not add stock'
    });
  }
}
export function* deleteSelectedStocksRequestWatcher() {
  yield takeEvery(stocksActions.DELETE_SELECTED_STOCKS_REQUEST, deleteSelectedStocks);
}
export function* deleteSelectedStocks(action) {
  try {
    const result = yield call(deleteStock, action.id);
    yield put({
      type: stocksActions.DELETE_SELECTED_STOCKS_SUCCESS
    })
  } catch (err) {
    yield put({
      type: stocksActions.DELETE_SELECTED_STOCKS_ERROR,
      error: 'Could not delete stocks'
    })
  }
}
export default function* stocksSaga() {
  yield all([
    fork(loadStocksRequestWatcher),
    fork(loadStockRequestWatcher),
    fork(addStockRequestWatcher),
    fork(deleteSelectedStocksRequestWatcher),
  ]);
}
