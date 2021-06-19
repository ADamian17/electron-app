export default class UtilNotification {

  static setup () {
    if (!('Notification' in window)) {
      console.log('this browser window does not support Notifications');
    } else if (Notification.permission === 'granted') {
      return;
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permition) => {
        if (permition === 'granted') {
          console.log('permition has been granted');
        }
      });
    }
  };

  static show ({ title, body }) {
    return new Notification(title, { body });
  };

}
