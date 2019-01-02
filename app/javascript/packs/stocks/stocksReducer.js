import stocksActions from "./stocksActions";

const initialState = {
  allStocks: [],
  selectedStock: null,
  error: null
};

export default function stocksReducer(currentState = initialState, action) {
  switch (action.type) {
    case stocksActions.LOAD_STOCKS_SUCCESS: {
      const newState = {
        ...currentState,
        allStocks: action.stocks
      };
      return newState;
    }
    case stocksActions.LOAD_STOCKS_ERROR: {
      const newState = {
        ...currentState,
        error: action.error
      };
      return newState;
    }
    default:
      return currentState;
  }
}
