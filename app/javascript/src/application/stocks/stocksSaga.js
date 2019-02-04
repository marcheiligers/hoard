import { takeEvery, call, all, fork, put } from 'redux-saga/effects';
import stocksActions from './stocksActions';
import { loadStocks, loadStock, addStock } from './stocksServices';

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
  console.log('In addStockRequestSaga, action.symbol:', action.symbol)
  try {
    const result = yield call(addStock, action.symbol);
    console.log('result.data from post new stock:', result.data)
    console.log('put an action to show a modal')
    // TODO: Add redux actions and react component for modal notifications.
    yield put({
      type: stocksActions.ADD_STOCK_SUCCESS,
      newStock: result.data
    });
  } catch (err) {
    console.log('AN ERROR FROM THE POST:', err)
    yield put({
      type: stocksActions.ADD_STOCK_ERROR,
      error: 'Could not add stock'
    });
  }
}
export default function* stocksSaga() {
  yield all([
    fork(loadStocksRequestWatcher),
    fork(loadStockRequestWatcher),
    fork(addStockRequestWatcher)
  ]);
}
