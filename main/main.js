const { app, dialog } = require('electron'),
  { join } = require('path'),
  { format } = require('url'),
  { createMenu } = require('./menu.js'),
  { initWindow } = require('./window.js'),
  { isDev } = require('../config/env.js');

const { onCompress } = require('./service/compressService.js');

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

function registerService() {
  onCompress(mainWindow);
  app.on('activate', () => {
    if (mainWindow === null) {
      mainWindow = createWindow();
    }
  });
}

function createWindow() {
  mainWindow = initWindow(windowUrl, options);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  registerService(mainWindow);
}

function init() {
  // const options = { width: 600, height: 600 },
  // windowUrl = isDev() ? 'http://localhost:8080/#/menu' : `file://${resolve(app.getAppPath(), 'dist/web/index.html/#/menu')}`;
  createWindow();
  // init menu
  createMenu();
}

app.on('ready', init);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
