import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import writersReducer from "./writers/writersReducer";
import stocksReducer from "./stocks/stocksReducer";

const rootReducer = history =>
  combineReducers({
    writers: writersReducer,
    stocks: stocksReducer,
    router: connectRouter(history)
  });

export default rootReducer;
