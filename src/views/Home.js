import React, { useEffect } from 'react';

import { fetchChacts } from '../js/api/chat';

import AvailalibleChats from '../components/AvailalibleChats/AvailalibleChats';
import JoinChats from '../components/JoinChats/JoinChats';
import ViewTitle from '../components/shared/ViewTitle';

const Home = () => {

  useEffect(() => {
    fetchChacts();
  }, []);

  return (
    <div className="row no-gutters fh">
      <JoinChats />
      <div className="col-9 fh">
        <ViewTitle title="Choose your channel" />
        <AvailalibleChats />
      </div>
    </div>
  );
};

export default Home;
