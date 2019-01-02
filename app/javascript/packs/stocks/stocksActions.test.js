import data from "./stocksData.js";
import stocksActions from "./stocksActions.js";

describe("stocks action creators -> stocksActions", () => {
  it("gets stocks on loadStocksRequest", () => {
    const testLoadStocksRequest = stocksActions.loadStocksRequest();
    expect(testLoadStocksRequest).toEqual({
      type: stocksActions.LOAD_STOCKS_REQUEST
    });
  });
  it("returns stocks on loadStocksSuccess", () => {
    const testStocks = data;
    const testLoadStocksSuccess = stocksActions.loadStocksSuccess(testStocks);
    expect(testLoadStocksSuccess).toEqual({
      type: stocksActions.LOAD_STOCKS_SUCCESS,
      stocks: testStocks
    });
  });
  it("returns and error message on loadStocksError", () => {
    const testError = { message: "Could not load stocks" };
    const testLoadStocksError = stocksActions.loadStocksError(testError);
    expect(testLoadStocksError).toEqual({
      type: stocksActions.LOAD_STOCKS_ERROR,
      error: testError.message
    });
  });
});
