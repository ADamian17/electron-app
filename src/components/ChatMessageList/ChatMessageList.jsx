import React from 'react';

import Message from './Message/Message';

const ChatMessageList = ({ messages = [] }) => {
  const messageList = messages.map((message) => <Message key={message.id} message={message} />);
  return (
    messages && (
      <div className="chat-container">
        <ul className="chat-box chatContainerScroll">
          {
            messageList
          }

          <li
            className="chat-right"
          >
            <div className="chat-avatar">
              <img
                src="https://i.dlpng.com/static/png/7105396_preview.png"
                alt="Retail Admin"
              />
              <div className="chat-name">Test User 2</div>
            </div>
            <div className="chat-text-wrapper">
              <span className="chat-text">Some message 2</span>
              <span className="chat-spacer" />
              <div className="chat-hour">5h ago</div>
            </div>
          </li>

        </ul>
      </div>
    )
  );
};

export default ChatMessageList;
