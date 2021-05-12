import React, { useEffect } from 'react';

import { useRecoilState } from 'recoil';
import { chats } from '../recoil/chats/atom';

import { fetchChacts } from '../js/api/chat';

import AvailalibleChats from '../components/AvailalibleChats/AvailalibleChats';
import JoinChats from '../components/JoinChats/JoinChats';
import ViewTitle from '../components/shared/ViewTitle';

const Home = () => {
  const [chatsList, setChatsList] = useRecoilState(chats);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetchChacts();
      setChatsList(res);
    } catch (error) {
      return electron_methods.print(error);
    }
  };

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

export default Home;