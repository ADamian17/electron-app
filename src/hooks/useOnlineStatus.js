import React, { useState, useEffect } from 'react';

import { useRecoilState } from 'recoil';
import { onlineStatus } from '../recoil/user/atom';

const useOnlineStatus = () => {
  const [status, setStatus] = useRecoilState(onlineStatus);

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
