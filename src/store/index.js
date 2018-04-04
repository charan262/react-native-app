/**
 * @flow
 */

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { auth, authFailed, authInProgress } from "../reducers/auth";
import { keyFob, keyFobFailed, keyFobInProgress } from "../reducers/keyFob";
import { manual, manualFailed, manualInProgress } from "../reducers/manual";

const reducers = combineReducers({
  auth,
  authFailed,
  authInProgress,
  keyFob,
  keyFobFailed,
  keyFobInProgress,
  manual,
  manualFailed,
  manualInProgress,
});

const middleware = [
  thunk
];

const composer = __DEV__ ? composeWithDevTools : compose;
const store = createStore(reducers, composer(applyMiddleware(...middleware)));

export default store;

