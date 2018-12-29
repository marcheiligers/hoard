import createHistory from "history/createBrowserHistory";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware, push } from "react-router-redux";
import { applyMiddleware, createStore, compose } from "redux";

import allReducers from "./rootReducers";
import rootSaga from "./rootSagas";

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middlewares = [sagaMiddleware, routeMiddleware];

const store = createStore(
  allReducers,
  compose(
    applyMiddleware(...middlewares),
    typeof window === "object" &&
      typeof windom.devToolsExtension !== "undefined"
      ? window.devToolsExtension()
      : f => f
  )
);

sagaMiddleware.run(rootSaga);
store.dispatch(push("/"));
export { store, history };
