import { ChatsActionTypes } from './chats.types';

const INITIAL_STATE = {
  items: [],
};

const chatsReducer = (state = INITIAL_STATE, action) => {
  console.log(state);
  switch (action.type) {
    case ChatsActionTypes.CHATS_FETCH_SUCCESS:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

export default chatsReducer;
