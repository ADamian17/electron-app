import { combineReducers } from 'redux';
import { createErrorReducer, createIsFetchingReducer } from '../utils/common';

const INITIAL_STATE = {
  user: null,
  isChecking: false,
};

const createLoginReducer = () =>
  combineReducers({
    isChecking: createIsFetchingReducer('AUTH_LOGIN'),
    error: createErrorReducer('AUTH_LOGIN'),
  });

const createRegisterReducer = () =>
  combineReducers({
    isChecking: createIsFetchingReducer('AUTH_REGISTER'),
    error: createErrorReducer('AUTH_REGISTER'),
  });

function createAuthReducer() {
  const user = (state = null, action) => {
    switch (action.type) {
      case 'AUTH_ON_ERROR':
      case 'AUTH_ON_INIT':
        return null;
      case 'AUTH_REGISTER_SUCCESS':
      case 'AUTH_LOGIN_SUCCESS':
      case 'AUTH_ON_SUCCESS':
        return action.user;
      default:
        return state;
    }
  };

  return combineReducers({
    user,
    isChecking: createIsFetchingReducer('AUTH_ON'),
    login: createLoginReducer(),
    register: createRegisterReducer(),
  });
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'AUTH_ON_INIT':
      return {
        ...state,
        isChecking: true,
      };
    case 'AUTH_ON_SUCCESS':
      return {
        user: action.payload,
        isChecking: false,
      };
    case 'AUTH_ON_ERROR':
      return {
        user: null,
        isChecking: false,
      };
    default:
      return state;
  }
};

export default userReducer;
