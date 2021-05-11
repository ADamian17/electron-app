import React from 'react';
import { useHistory } from 'react-router-dom';

const ChatCard = ({ chat }) => {
  const history = useHistory();

  return (
    <li onClick={() => history.push(`/chat/${chat.id}`)} className="item">
      <div className="item-status">
        <img
          src={chat.image}
          alt="Retail Admin"
        />
        <span className="status online"></span>
      </div>
      <p className="name-time">
        <span className="name mr-2">{chat.name}</span>
      </p>
    </li>
  );
};

export default ChatCard;