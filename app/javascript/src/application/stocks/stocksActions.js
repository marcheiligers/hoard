// TODO: clean up the errors such that we only use one or two
export const stocksActions = {
  LOAD_STOCKS_REQUEST: 'LOAD_STOCKS_REQUEST',
  LOAD_STOCKS_SUCCESS: 'LOAD_STOCKS_SUCCESS',
  STOCKS_ERROR: 'STOCKS_ERROR',
  LOAD_STOCK_REQUEST: 'LOAD_STOCK_REQUEST',
  LOAD_STOCK_SUCCESS: 'LOAD_STOCK_SUCCESS',
  STOCK_ERROR: 'STOCK_ERROR',
  ADD_STOCK_REQUEST: 'ADD_STOCK_REQUEST',
  ADD_STOCK_ERROR: 'ADD_STOCK_ERROR',
  ADD_STOCK_SUCCESS: 'ADD_STOCK_SUCCESS',
  CLEAR_ADD_STOCK_ERROR: 'CLEAR_ADD_STOCK_ERROR',
  DELETE_STOCK_REQUEST: 'DELETE_STOCK_REQUEST',
  DELETE_STOCK_SUCCESS: 'DELETE_STOCK_SUCCESS',
  UPDATE_SELECTED_STOCKS: 'UPDATE_SELECTED_STOCKS',
  UPDATE_STOCK_REQUEST: 'UPDATE_STOCK_REQUEST',
  UPDATE_STOCK_SUCCESS: 'UPDATE_STOCK_SUCCESS',
  loadStocksRequest: () => ({
    type: stocksActions.LOAD_STOCKS_REQUEST
  }),
  loadStocksSuccess: stocks => ({
    type: stocksActions.LOAD_STOCKS_SUCCESS,
    stocks: stocks
  }),
  stocksError: err => ({
    type: stocksActions.STOCKS_ERROR,
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
  stockError: err => ({
    type: stocksActions.STOCK_ERROR,
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
  deleteStockRequest: id => ({
    type: stocksActions.DELETE_STOCK_REQUEST,
    id: id
  }),
  deleteStockSuccess: () => ({
    type: stocksActions.DELETE_STOCK_SUCCESS
  }),
  updateSelectedStocks: idsArray => ({
    type: stocksActions.UPDATE_SELECTED_STOCKS,
    selectedStocks: idsArray
  }),
  updateStockRequest: stock => ({
    type: stocksActions.UPDATE_STOCK_REQUEST,
    stock: stock
  }),
  updateStockSuccess: updatedStock => ({
    type: stocksActions.UPDATE_STOCK_SUCCESS,
    updatedStock: updatedStock
  })
};
export default stocksActions;
