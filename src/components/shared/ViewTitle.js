import React from 'react';

import { Link } from 'react-router-dom';

const ViewTitle = ({ title }) => (
  <div className="chat-name-container">
    <span className="name">{title}</span>
    <div>
      <Link to="/chat/create" className="btn btn-outline-primary btn-md">
        New
      </Link>
    </div>
  </div>
);

export default ViewTitle;
