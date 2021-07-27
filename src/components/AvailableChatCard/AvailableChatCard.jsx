import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { joinChat } from '../../redux/chats/chats.actions'

const AvailableChatCard = ({ chat }) => {
  const dispatch = useDispatch()
  const user = useSelector(({ auth }) => auth.user);

  const confirmChatJoin = (chat) => {
    const isConfirmed = confirm(`Do you want to join the chat: ${chat.name}`); // return boolean
    if (isConfirmed) {
      dispatch(joinChat(chat, user.uid))
    }
  }

  return (
    <div className="col-lg-3 col-md-6 mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{chat.name}</h5>
          <p className="card-text">{chat.description}</p>
          <button onClick={() => confirmChatJoin(chat)} className="btn btn-outline-primary">
            Join Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default AvailableChatCard;