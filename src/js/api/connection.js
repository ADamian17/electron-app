import firebase from 'firebase/app';
import 'firebase/database';

import db from '../firebase/firebase';

const getOnlineStatus = (isOnline) => ({
  state: isOnline ? 'online' : 'offline',
  lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
});

export const setUserOnlineStatus = (uid, isOnline) => {
  const userRef = db.doc(`/profiles/${uid}`);
  const status = getOnlineStatus(isOnline);
  return userRef.update(status);
};

export const onConnectionChange = (onConnection) => firebase
  .database()
  .ref('.info/connected')
  .on('value', (snapshot) => {
    const isConnected = snapshot?.val() ? snapshot.val() : false;

    onConnection(isConnected);
  }); // this will tell you if you are connected to your firebase database or not.
