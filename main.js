const { app, BrowserWindow, Notification, ipcMain } = require('electron');
const path = require('path');

const isDev = !app.isPackaged;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1500,
    height: 1000,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');
  isDev && win.webContents.openDevTools();
};

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  });
}

app.whenReady().then(createWindow);

ipcMain.on('notify', (e, message) => {
  new Notification({
    title: 'Notification',
    body: message,
  }).show();
});

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
