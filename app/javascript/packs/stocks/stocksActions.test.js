import stocksActions from "./stocksActions.js";
describe("stocks action creators -> stocksActions", () => {
  it("gets stocks on loadStocksRequest", () => {
    const testLoadStocksRequest = stocksActions.loadStocksRequest();
    expect(testLoadStocksRequest).toEqual({
      type: stocksActions.LOAD_STOCKS_REQUEST
    });
  });
});
