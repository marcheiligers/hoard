export const stocksActions = {
  LOAD_STOCKS_REQUEST: "LOAD_STOCKS_REQUEST",
  LOAD_STOCKS_SUCCESS: "LOAD_STOCKS_SUCCESS",
  LOAD_STOCKS_ERROR: "LOAD_STOCKS_ERROR",
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
  })
};
export default stocksActions;
