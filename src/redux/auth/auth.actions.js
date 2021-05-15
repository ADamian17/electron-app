import * as api from '../../js/api/auth';

import { AuthActionTypes } from './auth.types';

export const register = (formData) => async (dispatch) => {
  try {
    // dispatch({ type: AuthActionTypes.AUTH_REGISTER_INIT });

    await api.register(formData);

    dispatch({ type: AuthActionTypes.AUTH_REGISTER_SUCCESS });
  } catch (error) {
    dispatch({ type: AuthActionTypes.AUTH_REGISTER_ERROR, error });
  }
};

// export const loginUser = (formData) => (dispatch) => {
//   dispatch({ type: AuthActionTypes.AUTH_LOGIN_INIT });
//   return api
//     .login(formData)
//     .then((user) =>
//       dispatch({ type: AuthActionTypes.AUTH_LOGIN_SUCCESS, user })
//     )
//     .catch((error) => {
//       dispatch({ type: AuthActionTypes.AUTH_LOGIN_ERROR, error });
//     });
// };

export const logout = () => (dispatch) =>
  api.logout().then((_) => {
    dispatch({ type: AuthActionTypes.AUTH_LOGOUT_SUCCESS });
    // dispatch({ type: 'CHATS_FETCH_RESTART' });
  });

export const listenToAuthChanges = () => (dispatch) => {
  dispatch({ type: AuthActionTypes.AUTH_ON_INIT });
  api.onAuthChange((authUser) => {
    if (authUser) {
      dispatch({ type: AuthActionTypes.AUTH_ON_SUCCESS, payload: authUser });
    } else {
      dispatch({ type: AuthActionTypes.AUTH_ON_ERROR });
    }
  });
};
