import { SettingTypes } from './setting.types';

export const updateSettings = (setting, value) => ({
  type: SettingTypes.SETTING_UPDATE,
  setting,
  value,
});

export const loadInitialSettings = () => ({
  type: SettingTypes.SETTING_INITIAL_LOAD,
});
