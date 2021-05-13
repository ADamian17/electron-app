import React, { useEffect, useReducer } from 'react';

import { notification } from '../utils/funts';

// internal component
import Routes from '../config/routes';
import Loading from '../components/shared/Loading';

import useOnlineStatus from '../hooks/useOnlineStatus';

const App = () => {
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    notification(onlineStatus);
  }, [onlineStatus]);

  if (!onlineStatus) {
    return (
      <Loading
        message={
          'Application has been disconnected from the internet. Please reconnect...'
        }
      />
    );
  }

  return (
    <div className="content-wrapper">
      <Routes />
    </div>
  );
};

export default App;
