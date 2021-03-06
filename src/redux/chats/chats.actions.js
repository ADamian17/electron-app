import { ChatsActionTypes } from './chats.types';

import * as api from '../../js/api/chat';
import db from '../../js/firebase/firebase';

export const fetchChats = () => async (dispatch, getState) => {
  try {
    const { user } = getState().auth;

    dispatch({ type: ChatsActionTypes.CHATS_FETCH_INIT });
    const chats = await api.fetchChats();
    chats.forEach(
      (chat) => {
        chat.joinedUser = chat.joinedUser.map((usr) => usr.id);
        return chat.joinedUser;
      },
    );

    const sortedChats = chats.reduce(
      (acc, chat) => {
        acc[chat.joinedUser.includes(user.uid) ? 'joined' : 'availible'].push(
          chat,
        );

        return acc;
      },
      {
        joined: [],
        availible: [],
      },
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
    return dispatch({ type: ChatsActionTypes.CHATS_JOIN_SUCCESS, chat });
  } catch (error) {
    return console.log(error);
  }
};

export const subscribeToChat = (chatId) => (
  dispatch,
) => api.subscribeToChats(chatId, async (chat) => {
  const joinedUsers = await Promise.all(chat.joinedUser.map(async (userRef) => {
    try {
      const userSnapshot = await userRef.get();
      // this is to get the user information when we are refering the user in or firebase model

      return userSnapshot.data();
    } catch (error) {
      return console.log(error);
    }
  }));

  chat.joinedUser = joinedUsers;

  dispatch({
    type: ChatsActionTypes.CHAT_SET_ACTIVE_CHAT,
    chat,
  });
});

export const subscribeToProfile = (uid, chatId) => (dispatch) => api.subscribeToProfile(uid, (user) => {
  dispatch({
    type: ChatsActionTypes.CHAT_UPDATE_USER_STATE,
    user,
    chatId,
  });
});

export const sendChatMessage = (message, chatId) => async (dispatch, getState) => {
  try {
    const { user } = getState().auth;
    const userRef = db.doc(`/profiles/${user.uid}`);
    const newMessage = { ...message };
    newMessage.author = userRef;

    await api.sendChatMessage(newMessage, chatId);
    dispatch({ type: ChatsActionTypes.CHAT_MESSAGE_SENT });

    return;
  } catch (error) {
    console.log(error);
  }
};

export const subscribeToMessages = (chatId) => (dispatch) => api.subcribeToMessages(chatId, async (changes) => {
  const messages = changes.map((change) => {
    let data;
    if (change.type === 'added') data = { id: change.doc.id, ...change.doc.data() };

    return data;
  });

  const smsWithAuthors = [];
  const cache = {};

  // eslint-disable-next-line no-restricted-syntax
  for await (const message of messages) {
    if (cache[message.author.id]) {
      message.author = cache[message.author.id];
    } else {
      const userSnapshot = await message.author.get();
      cache[userSnapshot.id] = userSnapshot.data();
      message.author = cache[userSnapshot.id];
    }
    smsWithAuthors.push(message);
  }

  dispatch({ type: ChatsActionTypes.CHAT_SET_MESSAGES, messages, chatId });
  return messages;
});

export const registerMessageSubscribtion = (chatId, messageSub) => ({
  type: ChatsActionTypes.CHAT_REGISTER_MESSAGES_SUB,
  sub: messageSub,
  chatId,
});

// https://cdn.evilmartians.com/front/posts/optimizing-react-virtual-dom-explained/cover-a1d5b40.png

// https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png
