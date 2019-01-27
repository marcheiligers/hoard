import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import stocksReducer from "./stocks/stocksReducer";
import companyReducer from "./companies/company/companyReducer";

const rootReducer = history =>
  combineReducers({
    stocks: stocksReducer,
    company: companyReducer,
    router: connectRouter(history)
  });

export default rootReducer;
