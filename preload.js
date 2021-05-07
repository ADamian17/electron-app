const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  notificationApi: {
    sendNotification: function (message) {
      ipcRenderer.send('notify', message)
    }
  }
})
