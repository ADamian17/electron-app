import firebase from 'firebase/app';
import db from '../firebase/firebase';

export const fetchChats = async () => {
  try {
    const res = await db.collection('chats').get();
    const data = await res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    return console.log(error);
  }
};

export const createChat = async (data) => {
  try {
    const res = await db.collection('chats').add(data);
    return res.id;
  } catch (error) {
    return console.log(error);
  }
};

export const joinChat = async (userId, chatId) => {
  try {
    const userRef = db.doc(`profiles/${userId}`);
    const chatRef = db.doc(`chats/${chatId}`);

    await userRef.update({
      chats: firebase.firestore.FieldValue.arrayUnion(chatRef),
    });
    await chatRef.update({
      joinedUser: firebase.firestore.FieldValue.arrayUnion(userRef),
    });

    return 'success';
  } catch (error) {
    return console.log(error);
  }
};

export const subscribeToChats = (chatId, onSubscribe) => db
  .collection('chats')
  .doc(chatId)
  .onSnapshot((snapshot) => {
    const chat = { id: snapshot.id, ...snapshot.data() };

    return onSubscribe(chat);
  });

export const subscribeToProfile = (uid, onSubscribe) => db
  .collection('profiles')
  .doc(uid)
  .onSnapshot((snapshot) => onSubscribe(snapshot.data()));
