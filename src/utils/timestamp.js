import moment from 'moment';
import { Timestamp } from '../js/firebase/firebase';

export const createTimestamp = () => Timestamp.now().toMillis().toString();

export const formatTime = (time) => moment(parseInt(time, 10)).fromNow();
