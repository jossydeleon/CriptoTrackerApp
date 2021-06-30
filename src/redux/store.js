import { applyMiddleware, createStore, compose } from "redux";
import allReducers from "./reducers";
import thunk from "redux-thunk";

const store = createStore(
  allReducers,
  compose(
    applyMiddleware(thunk)
  )
);

export default store;
