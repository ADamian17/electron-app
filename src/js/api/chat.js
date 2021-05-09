import { async } from 'regenerator-runtime';
import db from '../firebase/firebase';

export const fetchChacts = async () => {

  try {
    const res = await db.collection('chats').get();
  
    const chats = await res.docs.map((doc) => ({id: doc.id, ...doc.data() }));
    electron_methods.print(chats);
  
    return chats;
    
  } catch (error) {
    return electron_methods.print(error);
  }

};
