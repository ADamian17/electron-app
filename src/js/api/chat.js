import db from '../firebase/firebase';

export const fetchChacts = async () => {
  try {
    const res = await db.collection('chats').get();
    return await res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    return electron_methods.print(error);
  }
};
