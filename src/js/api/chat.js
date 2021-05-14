import db from '../firebase/firebase';
import firebase from 'firebase/app';

export const fetchChacts = async () => {
  try {
    const res = await db.collection('chats').get();
    const data = await res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    data.forEach((chat) => {
      chat.admin = chat.admin.id;
      chat.joinedUsers = chat.joinedUsers.map((user) => user.id);
    });

    return data;
  } catch (error) {
    return console.log(error);
  }
};

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
  } catch (error) {
    return console.log(error);
  }
};

// https://cdn.evilmartians.com/front/posts/optimizing-react-virtual-dom-explained/cover-a1d5b40.png
