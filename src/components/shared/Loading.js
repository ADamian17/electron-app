import React from 'react';

import Loader from './Loader';

const Loading = ({ message = 'Just one moment please...' }) => (
  <div className="loading-screen">
    <div className="loading-view">
      <div className="loading-view-container">
        <div className="mb-3">{message}</div>
        <Loader />
      </div>
    </div>
  </div>
);

export default Loading;
