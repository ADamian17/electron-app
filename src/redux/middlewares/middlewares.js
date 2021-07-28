import { AppTypes } from '../app/app.types';
import { AuthActionTypes } from '../auth/auth.types';
import { SettingTypes } from '../setting/setting.types';

import UtilNotification from '../../utils/notification';
import Storage from '../../utils/storage';
// const state = store.getState(); gets all state
/*
    this middleware return
    1. store, so our app state
    2. next
    3. the action
  */
// eslint-disable-next-line consistent-return
export const appMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
  case AppTypes.APP_IS_ONLINE:
  case AppTypes.APP_IS_OFFLINE: {
    const { showNotifications } = store.getState().settings;
    if (showNotifications) {
      return UtilNotification.show({
        title: 'Connection Status',
        body: action.status ? 'Online' : 'Offline',
      });
    }
  }

  // eslint-disable-next-line no-fallthrough
  case SettingTypes.SETTING_UPDATE: {
    const { setting, value } = action;
    const currentSettings = Storage.getItem('app-setting');

    const settings = { ...currentSettings, [setting]: value };

    Storage.setItem('app-setting', settings);
  }

  // eslint-disable-next-line no-fallthrough
  case AuthActionTypes.AUTH_LOGOUT_SUCCESS: {
    // eslint-disable-next-line no-case-declarations
    const { messagesSub } = store.getState().chats;

    if (messagesSub) {
      Object.keys(messagesSub).forEach((messageSub) => {
        messagesSub[messageSub]();
      });
    }
  }
  // eslint-disable-next-line no-fallthrough
  default:
    break;
  }

  next(action);
};
