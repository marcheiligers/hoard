export const stocksActions = {
  LOAD_STOCKS_REQUEST: 'LOAD_STOCKS_REQUEST',
  LOAD_STOCKS_SUCCESS: 'LOAD_STOCKS_SUCCESS',
  LOAD_STOCKS_ERROR: 'LOAD_STOCKS_ERROR',
  LOAD_STOCK_REQUEST: 'LOAD_STOCK_REQUEST',
  LOAD_STOCK_SUCCESS: 'LOAD_STOCK_SUCCESS',
  LOAD_STOCK_ERROR: 'LOAD_STOCK_ERROR',
  ADD_STOCK_REQUEST: 'ADD_STOCK_REQUEST',
  ADD_STOCK_ERROR: 'ADD_STOCK_ERROR',
  ADD_STOCK_SUCCESS: 'ADD_STOCK_SUCCESS',
  CLEAR_ADD_STOCK_ERROR: 'CLEAR_ADD_STOCK_ERROR',
  DELETE_SELECTED_STOCKS_REQUEST: 'DELETE_SELECTED_STOCKS_REQUEST',
  DELETE_SELECTED_STOCKS_ERROR: 'DELETE_SELECTED_STOCKS_ERROR',
  DELETE_SELECTED_STOCKS_SUCCESS: 'DELETE_SELECTED_STOCKS_SUCCESS',
  UPDATE_SELECTED_STOCKS: 'UPDATE_SELECTED_STOCKS',
  loadStocksRequest: () => ({
    type: stocksActions.LOAD_STOCKS_REQUEST
  }),
  loadStocksSuccess: stocks => ({
    type: stocksActions.LOAD_STOCKS_SUCCESS,
    stocks: stocks
  }),
  loadStocksError: err => ({
    type: stocksActions.LOAD_STOCKS_ERROR,
    error: err.message
  }),
  loadStockRequest: id => ({
    type: stocksActions.LOAD_STOCK_REQUEST,
    id: id
  }),
  loadStockSuccess: stock => ({
    type: stocksActions.LOAD_STOCK_SUCCESS,
    selectedStock: stock
  }),
  loadStockError: err => ({
    type: stocksActions.LOAD_STOCK_ERROR,
    error: err
  }),
  addStockRequest: symbol => ({
    type: stocksActions.ADD_STOCK_REQUEST,
    symbol: symbol
  }),
  addStockError: err => ({
    type: stocksActions.ADD_STOCK_ERROR,
    error: err
  }),
  addStockSuccess: newStock => ({
    type: stocksActions.ADD_STOCK_SUCCESS,
    newStock: newStock
  }),
  clearAddStockError: () => ({
    type: stocksActions.CLEAR_ADD_STOCK_ERROR,
  }),
  deleteSelectedStocksRequest: id => ({
    type: stocksActions.DELETE_SELECTED_STOCKS_REQUEST,
    id: id
  }),
  deleteSelectedStocksSuccess: () => ({
    type: stocksActions.DELETE_SELECTED_STOCKS_SUCCESS
  }),
  deleteSelectedStocksError: err => ({
    type: stocksActions.DELETE_SELECTED_STOCKS_ERROR,
    error: err
  }),
  updateSelectedStocks: idsArray => ({
    type: stocksActions.UPDATE_SELECTED_STOCKS,
    selectedStocks: idsArray
  }),
};
export default stocksActions;
