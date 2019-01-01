import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import stocksReducer from "./stocks/stocksReducer";

const rootReducer = history =>
  combineReducers({
    stocks: stocksReducer,
    router: connectRouter(history)
  });

export default rootReducer;
