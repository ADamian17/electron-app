import React from 'react';

import ChatList from '../ChatList/ChatList';
import AvailableChatCard from '../AvailableChatCard/AvailableChatCard';

const AvailalibleChats = ({ chats }) => (
  <div className="container-fluid">
    <div className="row mt-3">
      {chats.length !== 0 ? (
        <ChatList chats={chats} CardComponent={AvailableChatCard} />
      ) : (
        <div className="container-fluid">
          <div className="alert alert-warning">No chats to join :(</div>
        </div>
      )}
    </div>
  </div>
);

export default AvailalibleChats;
