import React, { useEffect } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { chats, availibleChats, joinedChats } from '../recoil/chats/atom';
import { user } from '../recoil/user/atom';

import { fetchChacts } from '../js/api/chat';

import { withBaseLayout } from '../layout/base';
import AvailalibleChats from '../components/AvailalibleChats/AvailalibleChats';
import JoinChats from '../components/JoinChats/JoinChats';
import ViewTitle from '../components/shared/ViewTitle';

const Home = () => {
  const [chatsList, setChatsList] = useRecoilState(chats);
  const [joined, setJoined] = useRecoilState(joinedChats);
  const [availible, setavailible] = useRecoilState(availibleChats);
  const currentUser = useRecoilValue(user)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const chats = await fetchChacts();
      console.log({ chats });
      setChatsList(chats);
      sortChat()
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <div className="row no-gutters fh">
      <JoinChats chats={[]} />
      <div className="col-9 fh">
        <ViewTitle title="Choose your channel" />
        <AvailalibleChats chats={[]} />
      </div>
    </div>
  );
};

export default withBaseLayout(Home);
