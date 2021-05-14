import { atom } from 'recoil';

export const chats = atom({
  key: 'chats',
  default: [],
});

export const joinedChats = atom({
  key: 'joinedChats',
  default: [],
});

export const availibleChats = atom({
  key: 'availibleChats',
  default: [],
});
