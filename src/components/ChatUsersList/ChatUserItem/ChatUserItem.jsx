import React from 'react';

const ChatUserItem = (props) => {
  const { user } = props;

  return (
    <li className="item">
      <div className="item-status">
        <img src={user.avatar} alt="Retail Admin" />
        <span className={`status ${user.state}`} />
      </div>
      <p className="name-time">
        <span className="name mr-2">{user.username}</span>
      </p>
    </li>
  );
};

export default ChatUserItem;
