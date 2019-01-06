import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./rootReducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSagas";

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const initialState = {};
const store = createStore(
  createRootReducer(history),
  initialState,
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history), sagaMiddleware)
  )
);

sagaMiddleware.run(rootSaga);
export { store, history };
