import stocksActions from './stocksActions';

export const initialState = {
  allStocks: [],
  selectedStocks: [],
  selectedStock: null,
  error: null
};

export default function stocksReducer(currentState = initialState, action) {
  switch (action.type) {
    case stocksActions.LOAD_STOCKS_SUCCESS: {
      const newState = {
        ...currentState,
        allStocks: action.stocks,
        error: null
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
    case stocksActions.LOAD_STOCK_SUCCESS: {
      const newState = {
        ...currentState,
        selectedStock: action.selectedStock,
        error: null
      };
      return newState;
    }
    case stocksActions.LOAD_STOCK_ERROR: {
      const newState = {
        ...currentState,
        error: action.error
      };
      return newState;
    }
    case stocksActions.ADD_STOCK_SUCCESS: {
      const updatedStocks = [...currentState.allStocks, action.newStock];
      const newState = {
        ...currentState,
        allStocks: updatedStocks,
        error: null,
      };
      return newState;
    }
    case stocksActions.ADD_STOCK_ERROR: {
      const newState = {
        ...currentState,
        error: action.error
      };
      return newState;
    }
    case stocksActions.CLEAR_ADD_STOCK_ERROR: {
      const newState = {
        ...currentState,
        error: null,
      }
      return newState;
    }
    case stocksActions.DELETE_STOCK_REQUEST: {
      const updatedStocks = currentState.allStocks.filter(stock => stock.id !== action.id);
      const newState = {
        ...currentState,
        allStocks: updatedStocks,
        selectedStocks: [],
      }
      return newState;
    }
    case stocksActions.UPDATE_SELECTED_STOCKS: {
      const newState = {
        ...currentState,
        selectedStocks: action.selectedStocks,
      }
      return newState;
    }
    case stocksActions.DELETE_STOCK_ERROR: {
      const newState = {
        ...currentState,
        error: action.error
      }
      return newState;
    }
    case stocksActions.UPDATE_STOCK_SUCCESS: {
      const updatedStocks = currentState.allStocks.map((stock, idx) => {
        if (stock.id === action.updatedStock.id) {
          stock = action.updatedStock
        };
        return stock;
      });
      const newState = {
        ...currentState,
        allStocks: updatedStocks
      };
      return newState;
    }
    case stocksActions.UPDATE_STOCK_ERROR: {
      const newState = {
        ...currentState,
        error: action.error
      }
      return newState;
    }
    default:
      return currentState;
  }
}
