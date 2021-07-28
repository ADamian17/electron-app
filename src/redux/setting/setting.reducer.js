import { SettingTypes } from './setting.types';
import Storage from '../../utils/storage';

const INITIAL_STATE = {
  isDarkTheme: false,
  playSound: true,
  showNotifications: true,
  saveble: true,
};

// eslint-disable-next-line consistent-return
const settingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SettingTypes.SETTING_UPDATE:
    return {
      ...state,
      [action.setting]: action.value,
    };
  case SettingTypes.SETTING_INITIAL_LOAD: {
    const storedSettings = Storage.getItem('app-settings');

    return {
      ...state,
      ...storedSettings,
    };
  }
  default:
    return state;
  }
};

export default settingReducer;
