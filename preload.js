const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron_methods', {
  notificationApi: {
    sendNotification: function (message) {
      ipcRenderer.send('notify', message);
    },
  },
  print: function (log) {
    return console.log(log);
  },
});
