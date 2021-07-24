import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { subscribeToChat } from '../redux/chats/chats.actions';

/* Internal modules */
import { withBaseLayout } from '../layout/base';
import ChatUsersList from '../components/ChatUsersList/ChatUsersList';
import ViewTitle from '../components/shared/ViewTitle';
import ChatMessageList from '../components/ChatMessageList/ChatMessageList';

const Chat = () => {
  const { id } = useParams()
  const title = `Joined Chat ${id}`
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubFromChat = dispatch(subscribeToChat(id))

    return () => { unsubFromChat() }

  }, []);

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUsersList />
      </div>
      <div className="col-9 fh">
        <ViewTitle title={title} />
        <ChatMessageList />
      </div>
    </div>
  );
};

export default withBaseLayout(Chat, { canGoBack: true });
