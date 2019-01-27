export const stocksActions = {
  LOAD_STOCKS_REQUEST: 'LOAD_STOCKS_REQUEST',
  LOAD_STOCKS_SUCCESS: 'LOAD_STOCKS_SUCCESS',
  LOAD_STOCKS_ERROR: 'LOAD_STOCKS_ERROR',
  LOAD_STOCK_REQUEST: 'LOAD_STOCK_REQUEST',
  LOAD_STOCK_SUCCESS: 'LOAD_STOCK_SUCCESS',
  LOAD_STOCK_ERROR: 'LOAD_STOCK_ERROR',
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
};
export default stocksActions;
