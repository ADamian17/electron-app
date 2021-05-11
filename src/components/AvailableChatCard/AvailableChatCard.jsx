import React from 'react';

const AvailableChatCard = ({ chat }) => {
  return (
    <div className="col-lg-3 col-md-6 mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{chat.name}</h5>
          <p className="card-text">{chat.description}</p>
          <button onClick={() => { }} className="btn btn-outline-primary">
            Join Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default AvailableChatCard;