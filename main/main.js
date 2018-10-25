const { app, dialog } = require('electron'),
  { join } = require('path'),
  { format } = require('url'),
  { createMenu } = require('./menu.js'),
  { initWindow } = require('./window.js'),
  { isDev } = require('../config/env.js'),
  { onCompress } = require('./service/compressService.js');

const options = { width: 400, height: 600 },
  // windowUrl = isDev()
  //   ? 'http://localhost:8080'
  //   : `file://${resolve(app.getAppPath(), 'dist/web/index.html')}`;
  windowUrl = isDev()
    ? format({
        protocol: 'http:',
        slashes: true,
        host: 'localhost:8080'
      })
    : format({
        protocol: 'file:',
        slashes: true,
        pathname: join(app.getAppPath(), 'dist/web/index.html')
      });
let mainWindow;

function createWindow() {
  mainWindow = initWindow(windowUrl, options);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  onCompress(mainWindow);
}

function init() {
  createWindow();
  createMenu();
}

app.on('ready', init);

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
