import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchChats } from '../redux/chats/chats.actions';
import UtilNotification from '../utils/notification';

import { withBaseLayout } from '../layout/base';
import AvailalibleChats from '../components/AvailalibleChats/AvailalibleChats';
import JoinChats from '../components/JoinChats/JoinChats';
import ViewTitle from '../components/shared/ViewTitle';

const Home = () => {
  const dispatch = useDispatch();
  const joined = useSelector((state) => state.chats.joined);
  const availible = useSelector((state) => state.chats.availible);

  useEffect(() => {
    UtilNotification.setup();
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <div className="row no-gutters fh">
      <JoinChats chats={joined} />
      <div className="col-9 fh">
        <ViewTitle title="Choose your channel" />
        <AvailalibleChats chats={availible} />
      </div>
    </div>
  );
};

export default withBaseLayout(Home);
