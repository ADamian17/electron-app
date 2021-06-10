import { combineReducers } from 'redux';

// import reducer later
import authReducer from './auth/auth.reducer';
import chatsReducer from './chats/chats.reducer';
import appReducer from './app/app.reducer';

export default combineReducers({
  auth: authReducer,
  chats: chatsReducer,
  app: appReducer
});
