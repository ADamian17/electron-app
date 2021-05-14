import React, { useEffect } from 'react';

import { fetchChats } from '../redux/chats/chats.actions';
import { useDispatch, useSelector } from 'react-redux'

import { withBaseLayout } from '../layout/base';
import AvailalibleChats from '../components/AvailalibleChats/AvailalibleChats';
import JoinChats from '../components/JoinChats/JoinChats';
import ViewTitle from '../components/shared/ViewTitle';

const Home = () => {
  const dispatch = useDispatch()
  const chatsList = useSelector(state => state.chats.items);
  console.log({ chatsList });

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <div className="row no-gutters fh">
      <JoinChats chats={chatsList} />
      <div className="col-9 fh">
        <ViewTitle title="Choose your channel" />
        <AvailalibleChats chats={chatsList} />
      </div>
    </div>
  );
};

export default withBaseLayout(Home);
