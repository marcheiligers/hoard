import data from './stocksData.js';
import stocksActions from './stocksActions.js';

describe('stocks action creators -> stocksActions', () => {
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
  it('returns and error message on stocksError', () => {
    const testError = { message: 'Could not load stocks' };
    const testLoadStocksError = stocksActions.stocksError(testError);
    expect(testLoadStocksError).toEqual({
      type: stocksActions.STOCKS_ERROR,
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
  it('returns an error message on stockError', () => {
    const testError = { message: 'Could not load stock' };
    const testLoadStockError = stocksActions.stockError(testError);
    expect(testLoadStockError).toEqual({
      type: stocksActions.STOCK_ERROR,
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
  it('updates selectedStocks on updateSelectedStocks', () => {
    const testSelectedStocks = [data.stocks[1].id];
    const testUpdateSelectedStocks = stocksActions.updateSelectedStocks(testSelectedStocks);
    expect(testUpdateSelectedStocks).toEqual({
      type: stocksActions.UPDATE_SELECTED_STOCKS,
      selectedStocks: testSelectedStocks
    })
  });
  it('updates a stock on updateStockRequest', () => {
    const testUpdatedStock = { ...data.stocks[0], heart: true };
    const testUpdateStock = stocksActions.updateStockRequest(testUpdatedStock);
    expect(testUpdateStock).toEqual({
      type: stocksActions.UPDATE_STOCK_REQUEST,
      stock: testUpdatedStock
    })
  });
  it('updates a stock on updateStockSuccess', () => {
    const testUpdatedStock = { ...data.stocks[0], heart: true };
    const testUpdatedStockSuccess = stocksActions.updateStockSuccess(testUpdatedStock);
    expect(testUpdatedStockSuccess).toEqual({
      type: stocksActions.UPDATE_STOCK_SUCCESS,
      updatedStock: testUpdatedStock
    })
  });
});
