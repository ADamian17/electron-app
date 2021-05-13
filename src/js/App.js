import React, { useEffect } from 'react';

// internal component
import Routes from '../config/routes';

import useOnlineStatus from '../hooks/useOnlineStatus';

const App = () => {
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    console.log({ onlineStatus });
  }, [onlineStatus]);

  return (
    <div className="content-wrapper">
      <Routes />
    </div>
  );
};

export default App;

// https://replit.com/join/jwvoqyob-adonismartin
