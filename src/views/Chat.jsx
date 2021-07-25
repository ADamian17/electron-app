import React, { useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { subscribeToChat, subscribeToProfile } from '../redux/chats/chats.actions';

/* Internal modules */
import { withBaseLayout } from '../layout/base';
import ChatUsersList from '../components/ChatUsersList/ChatUsersList';
import ViewTitle from '../components/shared/ViewTitle';
import ChatMessageList from '../components/ChatMessageList/ChatMessageList';
import Loading from '../components/shared/Loading';

const Chat = () => {
  const { id } = useParams();
  const peopleWatchers = useRef({});

  const dispatch = useDispatch();
  const activeChat = useSelector(({ chats }) => chats.activeChats[id]);
  const title = `Joined Chat ${activeChat?.name}`;
  // if name exist will return the name else undefine
  const joinedUsers = activeChat?.joinedUser;

  const unSubFromJoinedUsers = useCallback(() => {
    Object.keys(peopleWatchers.current).forEach((uid) => peopleWatchers.current[uid]);
  }, [peopleWatchers.current]);

  useEffect(() => {
    const unsubFromChat = dispatch(subscribeToChat(id));

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

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUsersList users={activeChat?.joinedUser} />
      </div>
      <div className="col-9 fh">
        <ViewTitle title={title} />
        <ChatMessageList />
      </div>
    </div>
  );
};

export default withBaseLayout(Chat, { canGoBack: true });
