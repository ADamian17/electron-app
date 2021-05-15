import firebase from 'firebase/app';
import 'firebase/auth';

import db from '../firebase/firebase';

const createUserProfile = (data) =>
  db.collection('profiles').doc(data.uid).set(data);

export const getUserProfile = async (uid) => {
  if (!uid) return null;
  const res = await db.collection('profiles').doc(uid).get();

  return res.data();
};

export const register = async ({ email, password, username, avatar }) => {
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const newProfile = {
      uid: res.user.uid,
      email,
      username,
      avatar,
      chats: [],
    };
    await createUserProfile(newProfile);
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const onAuthChange = (onAuth) =>
  firebase.auth().onAuthStateChanged(onAuth);

export const login = async ({ email, password }) => {
  const res = await firebase.auth().signInWithEmailAndPassword(email, password);
  return res.user;
};

export const logout = () => firebase.auth().signOut();
