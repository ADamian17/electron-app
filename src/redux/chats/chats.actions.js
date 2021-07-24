import { ChatsActionTypes } from './chats.types';

import * as api from '../../js/api/chat';
import db from '../../js/firebase/firebase';

export const fetchChats = () => async (dispatch, getState) => {
  try {
    const { user } = getState().auth;
    console.log({ user });

    dispatch({ type: ChatsActionTypes.CHATS_FETCH_INIT });
    const chats = await api.fetchChats();
    chats.forEach(
      (chat) => (chat.joinedUser = chat.joinedUser.map((user) => user.id))
    );

    const sortedChats = chats.reduce(
      (acc, chat) => {
        acc[chat.joinedUser.includes(user.uid) ? 'joined' : 'availible'].push(
          chat
        );

        return acc;
      },
      {
        joined: [],
        availible: [],
      }
    );

    dispatch({
      type: ChatsActionTypes.CHATS_FETCH_SUCCESS,
      ...sortedChats,
    });

    return sortedChats;
  } catch (error) {
    return console.log(error);
  }
};

export const createChat = (data, userId) => async (dispatch) => {
  try {
    const chatData = { ...data };
    chatData.admin = db.doc(`profiles/${userId}`);

    const chatId = await api.createChat(chatData);
    dispatch({ type: ChatsActionTypes.CHATS_CREATE_SUCCESS });

    await api.joinChat(userId, chatId);

    dispatch({
      type: ChatsActionTypes.CHATS_JOIN_SUCCESS,
      chat: { ...chatData, id: chatId },
    });

    return chatId;
  } catch (error) {
    return console.log(error);
  }
};

export const joinChat = (chat, uid) => async (dispatch) => {
  try {
    await api.joinChat(uid, chat.id);
    dispatch({ type: ChatsActionTypes.CHATS_JOIN_SUCCESS, chat });
  } catch (error) {
    return console.log(error);
  }
};

export const subscribeToChat = (chatId) => (dispatch) =>
  api.subscribeToChats(chatId, (chat) => {
    dispatch({
      type: ChatsActionTypes.CHAT_SET_ACTIVE_CHAT,
      chat,
    });
  });

//https://cdn.evilmartians.com/front/posts/optimizing-react-virtual-dom-explained/cover-a1d5b40.png

// https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png
