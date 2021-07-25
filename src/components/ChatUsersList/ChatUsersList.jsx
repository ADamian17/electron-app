import React from 'react';
import ChatUserItem from './ChatUserItem/ChatUserItem';

const ChatUsersList = ({ users }) => {
  console.log({users});
  const usersList =  users && users.map((user) => <ChatUserItem key={user.uid} user={user} /> );

  return (
    <div className="list-container">
      <div className="chat-search-box">
        <div className="input-group">
          <input className="form-control" placeholder="Search" />
        </div>
      </div>
      <ul className="items">
        {
          usersList
        }
      </ul>
    </div>
  )
}

export default ChatUsersList;