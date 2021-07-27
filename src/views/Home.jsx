import React, { useEffect } from 'react';

<<<<<<< HEAD
import { useRecoilState, useRecoilValue } from 'recoil';
import { chats } from '../recoil/chats/atom';
import { user } from '../recoil/user/atom';
=======
import { useDispatch, useSelector } from 'react-redux';
>>>>>>> faaee3010ebb6749eb9a63f8114f16cdc1498803

import { fetchChats } from '../redux/chats/chats.actions';
import UtilNotification from '../utils/notification';

import { withBaseLayout } from '../layout/base';
import AvailalibleChats from '../components/AvailalibleChats/AvailalibleChats';
import JoinChats from '../components/JoinChats/JoinChats';
import ViewTitle from '../components/shared/ViewTitle';

const Home = () => {
<<<<<<< HEAD
  const [chatsList, setChatsList] = useRecoilState(chats);
  const currentUser = useRecoilValue(user)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const chats = await fetchChacts(currentUser);

      setChatsList(chats);

    } catch (error) {
      return console.log(error);
    }
  };
=======
  const dispatch = useDispatch();
  const joined = useSelector((state) => state.chats.joined);
  const availible = useSelector((state) => state.chats.availible);

  useEffect(() => {
    UtilNotification.setup();
    dispatch(fetchChats());
  }, [dispatch]);
>>>>>>> faaee3010ebb6749eb9a63f8114f16cdc1498803

  console.log('chats list', chatsList);
  return (
    <div className="row no-gutters fh">
<<<<<<< HEAD
      <JoinChats chats={[]} />
      <div className="col-9 fh">
        <ViewTitle title="Choose your channel" />
        <AvailalibleChats chats={[]} />
=======
      <JoinChats chats={joined} />
      <div className="col-9 fh">
        <ViewTitle title="Choose your channel" />
        <AvailalibleChats chats={availible} />
>>>>>>> faaee3010ebb6749eb9a63f8114f16cdc1498803
      </div>
    </div>
  );
};

export default withBaseLayout(Home);
