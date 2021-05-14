import { createStore, applyMiddleware, compose } from 'redux';

// middlewares imports
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

let middlewares = [thunk, logger];

const composeEnhancers = compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
