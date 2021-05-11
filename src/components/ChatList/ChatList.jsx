import React from 'react';

const ChatList = ({ chats, CardComponent }) => (
  chats.map(chat => <CardComponent key={chat.id} chat={chat} />)
);

export default ChatList;
