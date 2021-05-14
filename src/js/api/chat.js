import db from '../firebase/firebase';

export const fetchChacts = async () => {
  try {
    const res = await db.collection('chats').get();
    const data = await res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    return console.log(error);
  }
};

export const createChat = async (data) => {
  const newChat = { ...data };
  try {
    const res = await db.collection('chats').add(newChat);
    return res;
  } catch (error) {
    return console.log(error);
  }
};
