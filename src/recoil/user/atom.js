import { atom } from 'recoil';

export const user = atom({
  key: 'user',
  default: electron_methods.getLocalStorageItem('uid'),
});
