import { takeEvery, call, all, fork, put } from 'redux-saga/effects';
import stocksActions from './stocksActions';
import { loadStocks, loadStock, addStock, deleteStock, updateStock } from './stocksServices';

// TODO: Rethink hard coding these error messages, we should rather be using the error message from the api

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
export function* deleteStockRequestWatcher() {
  yield takeEvery(stocksActions.DELETE_STOCK_REQUEST, deleteStockRequest);
}
export function* deleteStockRequest(action) {
  try {
    const result = yield call(deleteStock, action.id);
    yield put({
      type: stocksActions.DELETE_STOCK_SUCCESS
    })
  } catch (err) {
    yield put({
      type: stocksActions.DELETE_STOCK_ERROR,
      error: 'Could not delete stock'
    })
  }
}
export function* updateStockRequestWatcher() {
  yield takeEvery(stocksActions.UPDATE_STOCK_REQUEST, updateStockRequest);
}
export function* updateStockRequest(action) {
  try {
    const result = yield call(updateStock, action.stock);
    yield put({
      type: stocksActions.UPDATE_STOCK_SUCCESS,
      updatedStock: result.data
    })
  } catch (err) {
    yield put({
      type: stocksActions.UPDATE_STOCK_ERROR,
      error: 'Could not update stock'
    })
  }
}
export default function* stocksSaga() {
  yield all([
    fork(loadStocksRequestWatcher),
    fork(loadStockRequestWatcher),
    fork(addStockRequestWatcher),
    fork(deleteStockRequestWatcher),
    fork(updateStockRequestWatcher),
  ]);
}
