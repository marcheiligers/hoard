import data from './stocksData.js';
import stocksActions from './stocksActions.js';
// TODO: add tests for adding a stock
describe.only('stocks action creators -> stocksActions', () => {
  it('gets stocks on loadStocksRequest', () => {
    const testLoadStocksRequest = stocksActions.loadStocksRequest();
    expect(testLoadStocksRequest).toEqual({
      type: stocksActions.LOAD_STOCKS_REQUEST
    });
  });
  it('returns stocks on loadStocksSuccess', () => {
    const testStocks = data;
    const testLoadStocksSuccess = stocksActions.loadStocksSuccess(testStocks);
    expect(testLoadStocksSuccess).toEqual({
      type: stocksActions.LOAD_STOCKS_SUCCESS,
      stocks: testStocks
    });
  });
  it('returns and error message on loadStocksError', () => {
    const testError = { message: 'Could not load stocks' };
    const testLoadStocksError = stocksActions.loadStocksError(testError);
    expect(testLoadStocksError).toEqual({
      type: stocksActions.LOAD_STOCKS_ERROR,
      error: testError.message
    });
  });
  it('gets a stock on loadStockRequest', () => {
    const testId = 8;
    const testLoadStockRequest = stocksActions.loadStockRequest(testId);
    expect(testLoadStockRequest).toEqual({
      type: stocksActions.LOAD_STOCK_REQUEST,
      id: testId
    });
  });
  it('returns stocks on loadStockSuccess', () => {
    const testStock = data.stocks[0];
    const testLoadStockSuccess = stocksActions.loadStockSuccess(testStock);
    expect(testLoadStockSuccess).toEqual({
      type: stocksActions.LOAD_STOCK_SUCCESS,
      selectedStock: testStock
    });
  });
  it('returns and error message on loadStockError', () => {
    const testError = { message: 'Could not load stock' };
    const testLoadStockError = stocksActions.loadStockError(testError);
    expect(testLoadStockError).toEqual({
      type: stocksActions.LOAD_STOCK_ERROR,
      error: testError
    });
  });
  it('deletes a stock on deleteStockRequest', () => {
    const testStockId = data.stocks[0].id;
    const testDeleteStockRequest = stocksActions.deleteStockRequest(testStockId);
    expect(testDeleteStockRequest).toEqual({
      type: stocksActions.DELETE_STOCK_REQUEST,
      id: testStockId,
    });
  });
  it('does nothing on deleteStockSuccess', () => {
    const testDeleteStocksSuccess = stocksActions.deleteStockSuccess();
    expect(testDeleteStocksSuccess).toEqual({
      type: stocksActions.DELETE_STOCK_SUCCESS,
    })
  });
  it('returns and error message on deleteStockError', () => {
    const testError = { message: 'Could not delete stock' };
    const testDeleteStockError = stocksActions.deleteStockError(testError);
    expect(testDeleteStockError).toEqual({
      type: stocksActions.DELETE_STOCK_ERROR,
      error: testError
    });
  });
  it('updates selectedStocks on updateSelectedStocks', () => {
    const testSelectedStocks = [data.stocks[1].id];
    const testUpdateSelectedStocks = stocksActions.updateSelectedStocks(testSelectedStocks);
    expect(testUpdateSelectedStocks).toEqual({
      type: stocksActions.UPDATE_SELECTED_STOCKS,
      selectedStocks: testSelectedStocks
    })
  })
});
