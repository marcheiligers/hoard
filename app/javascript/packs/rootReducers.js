import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import writersReducer from "./writers/writersReducer";

const allReducers = combineReducers({
  writers: writersReducer,
  routing: routerReducer
});
const rootReducer = (state, action) => {
  return allReducers(state, action);
};
export default rootReducer;
