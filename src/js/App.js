import React, { useEffect } from 'react';

import { notification } from '../utils/funts';

import { useDispatch } from 'react-redux';
import { listenToAuthChanges } from '../redux/auth/auth.actions';

// internal component
import Routes from '../config/routes';
import Loading from '../components/shared/Loading';

import useOnlineStatus from '../hooks/useOnlineStatus';

const App = () => {
  const dispatch = useDispatch();
  // const onlineStatus = useOnlineStatus();

  useEffect(() => {
    dispatch(listenToAuthChanges());
    // notification(onlineStatus);
  }, [dispatch]);

  // if (!onlineStatus) {
  //   return (
  //     <Loading
  //       message={
  //         'Application has been disconnected from the internet. Please reconnect...'
  //       }
  //     />
  //   );
  // }

  return (
    <div className="content-wrapper">
      <Routes />
    </div>
  );
};

export default App;
