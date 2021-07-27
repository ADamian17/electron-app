import React from 'react';

const Message = ({ message }) => (
  <li
    key={message.id}
    className="chat-left"
  >
    <div className="chat-avatar">
      <img
        src="https://www.pinclipart.com/picdir/middle/133-1331433_free-user-avatar-icons-happy-flat-design-png.png"
        alt="Retail Admin"
      />
      <div className="chat-name">Test User 1</div>
    </div>
    <div className="chat-text-wrapper">
      <span className="chat-text">{message.content}</span>
      <span className="chat-spacer" />
      <div className="chat-hour">{message.timestamp}</div>
    </div>
  </li>
);

export default Message;
