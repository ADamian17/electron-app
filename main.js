const {
  app, BrowserWindow, Notification, ipcMain, Menu, Tray,
// eslint-disable-next-line import/no-extraneous-dependencies
} = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

const dockIcon = path.join(__dirname, 'assets', 'images', 'main-icon.png');
const trayIcon = path.join(__dirname, 'assets', 'images', 'trayIcon.png');

const createSplashWindow = () => {
  const win = new BrowserWindow({
    width: 400,
    height: 200,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
    },
  });

  win.loadFile('splash.html');
  return win;
};

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1500,
    height: 1000,
    backgroundColor: '#6e707e',
    show: false,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');
  isDev && win.webContents.openDevTools();

  return win;
};

if (isDev) {
  // eslint-disable-next-line global-require
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  });
}

if (process.platform === 'darwin') {
  app.dock.setIcon(dockIcon);
}

let tray = null;

app.whenReady()
  .then(() => {
    // eslint-disable-next-line global-require
    const template = require('./utils/Menu').createTemplate(app);
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    tray = new Tray(trayIcon);
    tray.setContextMenu(menu);

    const splash = createSplashWindow();
    const mainWin = createWindow();

    mainWin.once('ready-to-show', () => {
      splash.destroy();
      mainWin.show();
    });
  });

ipcMain.on('notify', (e, message) => {
  new Notification({
    title: 'Notification',
    body: message,
  }).show();
});

ipcMain.on('app-quit', () => app.quit());

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
