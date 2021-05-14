import { combineReducers } from 'redux';
import { createErrorReducer, createIsFetchingReducer } from '../utils/common';

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

const INITIAL_STATE = {
  userId: localStorage.getItem('uid'),
};

const userReducer = (state = INITIAL_STATE, action) => {
  // console.log(state);
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
