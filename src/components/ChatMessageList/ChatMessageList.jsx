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
        </ul>
      </div>
    )
  );
};

export default ChatMessageList;
