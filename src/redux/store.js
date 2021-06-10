import { createStore, applyMiddleware, compose } from 'redux';

// external middlewares
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// internal middlewares
import { appMiddleware } from './middlewares/middlewares';

import rootReducer from './root-reducer';

let middlewares = [thunk, logger, appMiddleware];

const composeEnhancers = compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
