import React from 'react';
import { useParams } from 'react-router-dom';

/* Internal modules */
import ChatUsersList from '../components/ChatUsersList/ChatUsersList';
import ViewTitle from '../components/shared/ViewTitle';
import ChatMessageList from '../components/ChatMessageList/ChatMessageList';

const Chat = () => {
  const params = useParams()
  const title = params.chat.replace('-', ' ')

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
  )
}

export default Chat;