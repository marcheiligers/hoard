import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import stocksReducer from "./stocks/stocksReducer";
import companyReducer from "./companies/company/companyReducer";
import utilitiesReducer from "./utilities/utilitiesReducer";

const rootReducer = history =>
  combineReducers({
    stocks: stocksReducer,
    company: companyReducer,
    utilities: utilitiesReducer,
    router: connectRouter(history)
  });

export default rootReducer;
