import * as api from '../../js/api/auth';

import { AuthActionTypes } from './auth.types';
import { ChatsActionTypes } from '../chats/chats.types';

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({ type: AuthActionTypes.AUTH_REGISTER_INIT });

    await api.register(formData);
  } catch (error) {
    dispatch({ type: AuthActionTypes.AUTH_REGISTER_ERROR, error });
  }
};

// eslint-disable-next-line consistent-return
export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: AuthActionTypes.AUTH_LOGIN_INIT });
    return await api.login(data);
  } catch (error) {
    dispatch({ type: AuthActionTypes.AUTH_LOGIN_ERROR, error });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await api.logout();
    dispatch({ type: AuthActionTypes.AUTH_LOGOUT_SUCCESS });
    dispatch({ type: ChatsActionTypes.CHATS_FETCH_RESTART });
  } catch (error) {
    console.log(error);
  }
};

export const listenToAuthChanges = () => (dispatch) => {
  dispatch({ type: AuthActionTypes.AUTH_ON_INIT });
  return api.onAuthChange(async (authUser) => {
    if (authUser) {
      const profile = await api.getUserProfile(authUser.uid);
      dispatch({ type: AuthActionTypes.AUTH_ON_SUCCESS, user: profile });
    } else {
      dispatch({ type: AuthActionTypes.AUTH_ON_ERROR });
    }
  });
};
