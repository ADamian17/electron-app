import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

const useOnlineStatus = () => {
  const [status, setStatus] = useSelector(({app}) => app.isOnline );

  const handleOnlineStatus = () => {
    return setStatus(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  });

  return status;
};

export default useOnlineStatus;
