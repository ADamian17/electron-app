import { atom } from 'recoil';

export const user = atom({
  key: 'user',
  default: localStorage.getItem('uid'),
});

export const profile = atom({
  key: 'profile',
  default: null,
});

export const onlineStatus = atom({
  key: 'onlineStatus',
  default: navigator.onLine,
});
