import React from 'react';
import { useSelector } from 'react-redux';

const Message = ({ message }) => {
  const user = useSelector(({ auth }) => auth.user);
  const isAuthor = `chat-${user.uid === message.author.uid ? 'right' : 'left'}`;

  return (
    <li
      key={message.id}
      className={isAuthor}
    >
      <div className="chat-avatar">
        <img
          src={message.author.avatar}
          alt="Retail Admin"
        />
        <div className="chat-name">{message.author.username}</div>
      </div>
      <div className="chat-text-wrapper">
        <span className="chat-text">{message.content}</span>
        <span className="chat-spacer" />
        <div className="chat-hour">{message.timestamp}</div>
      </div>
    </li>
  );
};

export default Message;
