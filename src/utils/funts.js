const setup = () => {
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

const show = ({ title, body }) => {
  new Notification(title, { body });
};

export const notification = (status) => {
  setup();
  if (!status) {
    return show({ title: 'Connection Status', body: 'Office' });
  }
};
