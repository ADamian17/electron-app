import firebase from 'firebase/app';
import db from '../firebase/firebase';
import firebase from 'firebase/app';

<<<<<<< HEAD
export const fetchChacts = async (userId) => {
=======
export const fetchChats = async () => {
>>>>>>> faaee3010ebb6749eb9a63f8114f16cdc1498803
  try {
    const res = await db.collection('chats').get();
    const data = await res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    data.forEach((chat) => {
      chat.admin = chat.admin.id;
      chat.joinedUsers = chat.joinedUsers.map((user) => user.id);
    });

    const sortedChats = data.reduce(
      (accChat, chat) => {
        accChat[
          chat.joinedUsers.includes(userId) ? 'joined' : 'availible'
        ].push(chat);
        return accChat;
      },
      { joined: [], availible: [] }
    );

    return sortedChats;
  } catch (error) {
    return console.log(error);
  }
};

<<<<<<< HEAD
export const joinChat = async (userId, chatId) => {
  const userRef = db.doc(`profiles/${userId}`);
  const chatRef = db.doc(`chats/${chatId}`);

  await userRef.update({
    chats: firebase.firestore.FieldValue.arrayUnion(chatRef),
  });

  await chatRef.update({
    joinedUsers: firebase.firestore.FieldValue.arrayUnion(userRef),
  });
};

export const createChat = async (data, userId) => {
  try {
    const userRef = db.doc(`profiles/${userId}`);
    const newChatData = { admin: userRef, ...data };

    const newChat = await db.collection('chats').add(newChatData);
    await joinChat(userId, newChat.id);

    return newChat.id;
=======
export const createChat = async (data) => {
  try {
    const res = await db.collection('chats').add(data);
    return res.id;
>>>>>>> faaee3010ebb6749eb9a63f8114f16cdc1498803
  } catch (error) {
    return console.log(error);
  }
};

<<<<<<< HEAD
// https://cdn.evilmartians.com/front/posts/optimizing-react-virtual-dom-explained/cover-a1d5b40.png
=======
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

export const sendChatMessage = (message, chatId) => {
  db
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .doc(message.timestamp)
    .set(message);
};

export const subcribeToMessages = (chatId, onSubcribe) => db
  .collection('chats')
  .doc(chatId)
  .collection('messages')
  .onSnapshot((snapsthot) => onSubcribe(snapsthot.docChanges()));
>>>>>>> faaee3010ebb6749eb9a63f8114f16cdc1498803
