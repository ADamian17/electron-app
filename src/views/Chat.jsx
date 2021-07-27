import React, { useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
  subscribeToChat,
  subscribeToProfile,
  sendChatMessage,
  subscribeToMessages,
  registerMessageSubscribtion,
} from '../redux/chats/chats.actions';

/* Internal modules */
import { withBaseLayout } from '../layout/base';
import ChatUsersList from '../components/ChatUsersList/ChatUsersList';
import ViewTitle from '../components/shared/ViewTitle';
import ChatMessageList from '../components/ChatMessageList/ChatMessageList';
import Messanger from '../components/Messanger/Messanger';
import Loading from '../components/shared/Loading';

const Chat = () => {
  const { id } = useParams();

  const peopleWatchers = useRef({});
  const dispatch = useDispatch();
  const activeChat = useSelector(({ chats }) => chats.activeChats[id]);
  const messages = useSelector(({ chats }) => chats.messages[id]);
  const messagesSub = useSelector(({ chats }) => chats.messagesSub[id]);

  const title = `Joined Chat ${activeChat?.name}`;
  // if name exist will return the name else undefine
  const joinedUsers = activeChat?.joinedUser;

  const unSubFromJoinedUsers = useCallback(() => {
    Object.keys(peopleWatchers.current).forEach((uid) => peopleWatchers.current[uid]);
  }, [peopleWatchers.current]);

  useEffect(() => {
    const unsubFromChat = dispatch(subscribeToChat(id));

    if (!messagesSub) {
      // register subscribtion
      const unsubFromMessages = dispatch(subscribeToMessages(id));
      dispatch(registerMessageSubscribtion(id, unsubFromMessages));
    }

    return () => {
      unsubFromChat();
      unSubFromJoinedUsers();
    };
  }, []);

  const subscribeToJoinedUsers = useCallback((users) => {
    users.forEach((user) => {
      if (!peopleWatchers.current[user.uid]) {
        peopleWatchers.current[user.uid] = dispatch(subscribeToProfile(user.uid, id));
      }
    });
  }, [dispatch, id]);

  useEffect(() => {
    if (joinedUsers) {
      subscribeToJoinedUsers(joinedUsers);
    }
  }, [joinedUsers]);

  if (!activeChat?.id) {
    return <Loading message="loading chat" />;
  }

  const sendMessage = (message) => dispatch(sendChatMessage(message, id));

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUsersList users={activeChat?.joinedUser} />
      </div>

      <div className="col-9 fh">
        <ViewTitle title={title} />

        <ChatMessageList messages={messages} />

        <Messanger onSubmit={sendMessage} />

      </div>
    </div>
  );
};

export default withBaseLayout(Chat, { canGoBack: true });
