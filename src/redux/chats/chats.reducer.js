import { combineReducers } from 'redux';
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

export default combineReducers({
  availible,
  joined,
});
