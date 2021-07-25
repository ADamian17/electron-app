import { ConnectionTypes } from './connection.types';

import * as api from '../../js/api/connection';

export const checkUserConnection = (uid) => (dispatch) => api.onConnectionChange((isConnected) => {
  api.setUserOnlineStatus(uid, isConnected);
  dispatch({
    type: ConnectionTypes.CONNECTION_USER_STATUS_CHANGE,
  });
});
