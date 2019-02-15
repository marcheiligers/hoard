import stocksReducer, { initialState } from './stocksReducer';
import stocksActions from './stocksActions';
import data from './stocksData';
describe('stocks reducer -> load stocks', () => {
  const defaultState = stocksReducer(initialState, { type: 'unexpected' });
  it('returns an object', () => {
    expect(defaultState).toBeInstanceOf(Object);
  });
  it('returns an object equal to initialState', () => {
    const expected = ['allStocks', 'selectedStock', 'error'];
    expect(Object.keys(defaultState)).toEqual(expect.arrayContaining(expected));
  });
  it('adds new stocks on state on LOAD_STOCKS_SUCCESS', () => {
    const testStocks = [];
    let testAction = stocksActions.loadStocksSuccess(testStocks);
    const newState = stocksReducer(defaultState, testAction);
    expect(newState.allStocks).toEqual(testStocks);
    expect(newState.error).toBeNull();
  });
  it('adds an error to state on LOAD_STOCKS_ERROR', () => {
    const testError = { message: 'Could not load stocks' };
    let testAction = stocksActions.loadStocksError(testError);
    const newState = stocksReducer(defaultState, testAction);
    expect(newState.error).toEqual(testError.message);
  });
  it('adds a new stock on LOAD_STOCK_SUCCESS', () => {
    const testStock = data.stocks[0];
    let testAction = stocksActions.loadStockSuccess(testStock);
    const newState = stocksReducer(defaultState, testAction);
    expect(newState.selectedStock).toEqual(testStock);
    expect(newState.error).toBeNull();
  });
  it('adds an error to state on LOAD_STOCK_ERROR', () => {
    const testError = { message: 'Could not load stock' };
    let testAction = stocksActions.loadStockError(testError);
    const newState = stocksReducer(defaultState, testAction);
    expect(newState.error).toEqual(testError);
  });
  it('adds a new stock to allStocks on state on ADD_STOCK_SUCCESS', () => {
    const testAllStocks = [];
    const newStock = {
      id: 4,
      symbol: 'MOCK2',
      name: 'Mock Stock 2',
      annualDividends: null,
      heart: null,
      star: null,
      createdAt: '2019-01-31T18:22:05.279Z',
      updatedAt: '2019-02-01T18:22:05.279Z',
      url: 'http://localhost:5000/api/v1/stocks/4'
    }
    const testAction = stocksActions.addStockSuccess(newStock);
    const newState = stocksReducer(defaultState, testAction);
    expect(newState.allStocks.length).toEqual(1);
    expect(newState.allStocks.map(stock => stock.id).find(stock => stock.id === 4)).toNotBeNull;
  });
  it('adds an error to state on ADD_STOCK_ERROR', () => {
    const testError = { message: 'Could not add stock' };
    let testAction = stocksActions.addStockError(testError);
    const newState = stocksReducer(defaultState, testAction);
    expect(newState.error).toEqual(testError);
  });
  it('clears an error on state on CLEAR_ADD_STOCK_ERROR', () => {
    const testState = { ...defaultState, error: 'Could not add stock' };
    let testAction = stocksActions.clearAddStockError();
    const newState = stocksReducer(testState, testAction);
    expect(newState.error).toBeNull;
  });
  it('removes a stock from allStocks and empties the selectedStocks array on state on DELETE_STOCK_REQUEST', () => {
    const testState = { ...defaultState, selectedStocks: [2], allStocks: data.stocks };
    let testAction = stocksActions.deleteStockRequest(2);
    const newState = stocksReducer(testState, testAction);
    expect(newState.allStocks.length).toEqual(1);
    expect(newState.allStocks.filter(stock => stock.id === 2).length).toEqual(0);
  });
  it('adds an error to state on DELETE_STOCK_ERROR', () => {
    const testState = { ...defaultState, selectedStocks: [10], allStocks: data.stocks };
    const testError = { message: 'Could not delete stock' }
    let testAction = stocksActions.deleteStockError(testError);
    const newState = stocksReducer(testState, testAction);
    expect(newState.error).toEqual(testError);
  });
  it('updates a stock on UPDATE_STOCK_SUCCESS', () => {
    const testState = { ...defaultState, allStocks: data.stocks };
    const testUpdatedStock = { ...data.stocks[0], star: true }
    let testAction = stocksActions.updateStockSuccess(testUpdatedStock);
    const newState = stocksReducer(testState, testAction);
    expect(newState.allStocks.filter(stock => stock.id === testUpdatedStock.id).star).toBeTruthy;
  });
  it('adds an error to state on UPDATE_STOCK_ERROR', () => {
    const testState = { ...defaultState, allStocks: data.stocks };
    const testError = { message: 'Could not update stock' }
    let testAction = stocksActions.updateStockError(testError);
    const newState = stocksReducer(testState, testAction);
    expect(newState.error).toEqual(testError);
  });
});
