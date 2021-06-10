import {AppTypes} from './app.types';

const onStatusChange = (dispatch) => () => {
  const isOnline = navigator.onLine;

  const action = isOnline ? 
    {type: AppTypes.APP_IS_ONLINE, status: isOnline} :
    {type: AppTypes.APP_IS_OFFLINE, status: isOnline} 
  
  dispatch(action);  
}

export const listenToConnectionChanges = () => dispatch => {
  const connectionHandler = onStatusChange(dispatch);

  window.addEventListener('online', connectionHandler);
  window.addEventListener('offline', connectionHandler);
  
  return () => {
    window.removeEventListener('online', connectionHandler);
    window.removeEventListener('offline', connectionHandler);
  };
};