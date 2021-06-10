import {AppTypes} from '../app/app.types';

import UtilNotification from '../../utils/notification';

export const appMiddleware = (store) => (next) => (action) => {
  // const state = store.getState(); gets all state  
  /*
    this middleware return 
    1. store, so our app state
    2. next
    3. the action    
  */
  switch (action.type) {
    case AppTypes.APP_IS_ONLINE:
    case AppTypes.APP_IS_OFFLINE:
      UtilNotification.show({ 
        title: 'Connection Status', 
        body: action.status ? 'Online' : 'Offline'
      });
    default:
      break;
  }

  next(action);
}  