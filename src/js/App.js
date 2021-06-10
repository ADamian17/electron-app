import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { listenToAuthChanges } from '../redux/auth/auth.actions';
import { listenToConnectionChanges } from '../redux/app/app.actions';

// internal component
import Routes from '../config/routes';
import Loading from '../components/shared/Loading';

const App = () => {
  const dispatch = useDispatch();
  const isChecking = useSelector(({auth}) => auth.isChecking );
  const isOnline = useSelector(({app}) => app.isOnline);

  useEffect(() => {
    const unsubFromAuth = dispatch(listenToAuthChanges());
    const unsubFromConnection =  dispatch(listenToConnectionChanges())

    return () => {
      unsubFromAuth();
      unsubFromConnection();
    };
  }, [dispatch]);

  if (!isOnline) {
    return (
      <Loading
        message={
          'Application has been disconnected from the internet. Please reconnect...'
        }
      />
    );
  }

  if (isChecking) {
    <Loading />
  }

  return (
    <div className="content-wrapper">
      <Routes />
    </div>
  );
};

export default App;
