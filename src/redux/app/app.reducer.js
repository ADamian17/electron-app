import { combineReducers } from 'redux';

import { AppTypes } from './app.types';

const INITIAL_STATE = navigator.onLine;

const isOnline = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case AppTypes.APP_IS_ONLINE:
  case AppTypes.APP_IS_OFFLINE:
    return action.status;
  default:
    return state;
  }
};

export default combineReducers({
  isOnline,
});
