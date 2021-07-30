const {
  app, BrowserWindow, Notification, ipcMain, Menu, Tray, autoUpdater,
// eslint-disable-next-line import/no-extraneous-dependencies
} = require('electron');
require('update-electron-app')();

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

const server = 'https://github.com/ADamian17/electron-app/releases/tag/v1-7-29-2021';
const url = `${server}/update/${process.platform}/${app.getVersion()}`;

autoUpdater.setFeedURL({ url });

setInterval(() => {
  autoUpdater.checkForUpdates();
}, 60000);

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.',
  };

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall();
  });
});

autoUpdater.on('error', (message) => {
  console.error('There was a problem updating the application');
  console.error(message);
});

// chromiun web engine for rendering ui

/* webpack is a mudole builder, main purpese is to bundle JS files for usege in the browser */
/* Babel is js compiler */
