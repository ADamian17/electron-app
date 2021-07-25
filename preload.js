const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron_methods', {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send('notify', message);
    },
  },
});
