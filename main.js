const { app, BrowserWindow, Notification } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1500,
    height: 1000,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: true,
      /* sanatize JS code */
      worldSafeExecuteJavaScript: true,
      /* is a feuture that ensures that both,  your preload scripts and electron internal logic tun separete context */
      contextIsolation: true
    },
  });

  win.loadFile('index.html');
  win.webContents.openDevTools();
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// chromiun web engine for rendering ui


/* webpack is a mudole builder, main purpese is to bundle JS files for usege in the browser */
/* Babel is js compiler */