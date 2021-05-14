import { ChatsActionTypes } from './chats.types';

import * as api from '../../js/api/chat';

export const fetchChats = () => async (dispatch) => {
  try {
    const chats = await api.fetchChats();

    dispatch({
      type: ChatsActionTypes.CHATS_FETCH_SUCCESS,
      payload: chats,
    });

    return chats;
  } catch (error) {
    return console.log(error);
  }
};
