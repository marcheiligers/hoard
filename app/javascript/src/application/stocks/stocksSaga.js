import { takeEvery, call, all, fork, put } from 'redux-saga/effects';
import stocksActions from './stocksActions';
import { loadStocks, loadStock } from './stocksServices';

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

export default function* stocksSaga() {
  yield all([fork(loadStocksRequestWatcher), fork(loadStockRequestWatcher)]);
}
