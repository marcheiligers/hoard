import stocksReducer, { initialState } from "./stocksReducer.js";
import stocksActions from "./stocksActions.js";

describe("stocks reducer -> load stocks", () => {
  const defaultState = stocksReducer(initialState, { type: "unexpected" });
  it("returns an object", () => {
    expect(defaultState).toBeInstanceOf(Object);
  });
  it("returns an object equal to initialState", () => {
    const expected = ["allStocks", "selectedStock", "error"];
    expect(Object.keys(defaultState)).toEqual(expect.arrayContaining(expected));
  });
  it("updates state on LOAD_STOCKS_SUCCESS", () => {
    const testStocks = [];
    let testAction = stocksActions.loadStocksSuccess(testStocks);
    const newState = stocksReducer(defaultState, testAction);
    expect(newState.allStocks).toEqual(testStocks);
    expect(newState.error).toBeNull();
  });
  it("updates state on LOAD_STOCKS_ERROR", () => {
    const testError = { message: "Could not load stocks" };
    let testAction = stocksActions.loadStocksError(testError);
    const newState = stocksReducer(defaultState, testAction);
    expect(newState.error).toEqual(testError.message);
  });
});
