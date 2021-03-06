import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { listenToAuthChanges } from '../redux/auth/auth.actions';
import { listenToConnectionChanges } from '../redux/app/app.actions';
import { checkUserConnection } from '../redux/connection/connection.actions';
import { loadInitialSettings } from '../redux/setting/setting.actions';

// internal component
import Routes from '../config/routes';
import Loading from '../components/shared/Loading';

const App = () => {
  const dispatch = useDispatch();
  const isChecking = useSelector(({ auth }) => auth.isChecking);
  const isOnline = useSelector(({ app }) => app.isOnline);
  const user = useSelector(({ auth }) => auth.user);

  const { isDarkTheme } = useSelector(({ settings }) => settings);

  useEffect(() => {
    const unsubFromAuth = dispatch(listenToAuthChanges());
    const unsubFromConnection = dispatch(listenToConnectionChanges());
    dispatch(loadInitialSettings());

    return () => {
      unsubFromAuth();
      unsubFromConnection();
    };
  }, [dispatch]);

  useEffect(() => {
    let unsubFromUserConnection;
    if (user?.uid) {
      unsubFromUserConnection = dispatch(checkUserConnection(user.uid));
    }

    return () => {
      unsubFromUserConnection && unsubFromUserConnection();
    };
  }, [dispatch, user]);

  if (!isOnline) {
    return (
      <Loading
        message="Application has been disconnected from the internet. Please reconnect..."
      />
    );
  }

  if (isChecking) {
    <Loading />;
  }

  return (
    <div className={`content-wrapper ${isDarkTheme ? 'dark' : 'ligth'}`}>
      <Routes />
    </div>
  );
};

export default App;
