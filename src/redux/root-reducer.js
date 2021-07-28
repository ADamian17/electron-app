import { combineReducers } from 'redux';
import { AuthActionTypes } from './auth/auth.types';

// import reducer later
import authReducer from './auth/auth.reducer';
import chatsReducer from './chats/chats.reducer';
import appReducer from './app/app.reducer';
import settingReducer from './setting/setting.reducer';

const mainReducer = combineReducers({
  auth: authReducer,
  chats: chatsReducer,
  app: appReducer,
  settings: settingReducer,
});

const rootReducer = (state, action) => {
  if (action.type === AuthActionTypes.AUTH_LOGOUT_SUCCESS) {
    Object.keys(state).forEach((key) => {
      if (state[key].saveble) return;

      state[key] = undefined;
    });
  }

  return mainReducer(state, action);
};

export default rootReducer;
