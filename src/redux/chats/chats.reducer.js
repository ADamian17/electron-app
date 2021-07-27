import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import { ChatsActionTypes } from './chats.types';

const joined = (state = [], action) => {
  switch (action.type) {
  case ChatsActionTypes.CHATS_FETCH_RESTART:
    return [];
  case ChatsActionTypes.CHATS_FETCH_SUCCESS:
    return action.joined;
  case ChatsActionTypes.CHATS_JOIN_SUCCESS:
    return [...state, action.chat];
  default:
    return state;
  }
};

const availible = (state = [], action) => {
  switch (action.type) {
  case ChatsActionTypes.CHATS_FETCH_RESTART:
    return [];
  case ChatsActionTypes.CHATS_FETCH_SUCCESS:
    return action.availible;
  case ChatsActionTypes.CHATS_JOIN_SUCCESS:
    return state.filter((chat) => chat.id !== action.chat.id);
  default:
    return state;
  }
};

const activeChats = createReducer({}, {
  [ChatsActionTypes.CHAT_SET_ACTIVE_CHAT]: (state, action) => {
    const { chat } = action;
    state[chat.id] = chat;
  },
  // eslint-disable-next-line consistent-return
  [ChatsActionTypes.CHAT_UPDATE_USER_STATE]: (state, action) => {
    const { user, chatId } = action;

    const joinedUsers = state[chatId].joinedUser;
    const foundUser = joinedUsers.find((joinedUser) => joinedUser.uid === user.uid);

    if (foundUser.state === user.state) {
      return state;
    }

    foundUser.state = user.state;
  },
});

const messages = createReducer({}, {
  [ChatsActionTypes.CHAT_SET_MESSAGES]: (state, action) => {
    const prevMessages = state[action.chatId] || [];
    state[action.chatId] = [...prevMessages, ...action.messages];
  },
});

const messagesSub = (state = {}, action) => {
  switch (action.type) {
  case ChatsActionTypes.CHAT_REGISTER_MESSAGES_SUB:
    return {
      ...state,
      [action.chatId]: action.sub,
    };
  default:
    return state;
  }
};

export default combineReducers({
  availible,
  joined,
  activeChats,
  messages,
  messagesSub,
});
