import { AuthActionTypes } from './auth.types';

import { combineReducers } from 'redux';
import { createErrorReducer, createIsFetchingReducer } from '../utils/common';

const loginReducer = () => combineReducers({
    isChecking: createIsFetchingReducer('AUTH_LOGIN'),
    error: createErrorReducer('AUTH_LOGIN')
  });

const registerReducer = () => combineReducers({
    isChecking: createIsFetchingReducer('AUTH_REGISTER'),
    error: createErrorReducer('AUTH_REGISTER')
  });

function createAuthReducer() {
  const user = (state = null, action) => {
    switch (action.type) {
      case 'AUTH_ON_ERROR':
      case 'AUTH_ON_INIT':
        return null;
      case AuthActionTypes.AUTH_ON_SUCCESS:
        return action.user;
      default:
        return state;
    }
  };

  return combineReducers({
    user,
    isChecking: createIsFetchingReducer('AUTH_ON'),
    login: loginReducer,
    register: registerReducer
  });
}

export default createAuthReducer();

