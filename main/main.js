const { app, dialog } = require('electron'),
  { resolve } = require('path'),
  { createMenu } = require('./menu.js'),
  { initWindow } = require('./window.js'),
  { isDev } = require('../config/env.js');

require('./ipcMainListeners.js');

function init() {
  // init window
  const options = { width: 400, height: 600 },
    windowUrl = isDev() ? 'http://localhost:8080' : `file://${resolve(app.getAppPath(), 'dist/web/index.html')}`;
  let mainWindow;
  function createWindow () {
    mainWindow = initWindow(windowUrl, options);
    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  }
  createWindow();
  app.on('activate', () => {
    if (mainWindow === null) {
      mainWindow = createWindow(windowUrl, options);
    }
  });
  // init menu
  createMenu();
}

app.on('ready', init);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  };
});