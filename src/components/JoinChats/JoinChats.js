import React from 'react';

import ChatSearch from '../ChatSearch/ChatSearch';
import ChatList from '../ChatList/ChatList';
import ChatCard from '../ChactCard/ChactCard';

const JoinChats = ({ chats }) => {
  return (
    <div className="col-3 fh">
      <div className="list-container">
        <ChatSearch />
        <ul className="items">
          {chats && chats.length !== 0 ? (
            <ChatList chats={chats} CardComponent={ChatCard} />
          ) : (
            <div> no chats</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default JoinChats;
