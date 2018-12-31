import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import writersReducer from "./writers/writersReducer";

const rootReducer = history =>
  combineReducers({
    writers: writersReducer,
    router: connectRouter(history)
  });

export default rootReducer;
