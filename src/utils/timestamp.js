import { Timestamp } from '../js/firebase/firebase';

export const createTimestamp = () => Timestamp.now().toMillis().toString();
