const { app } = require('electron'),
  { resolve } = require('path'),
  { isDev } = require('./config/env.js'),
  { createMenu } = require('./main/menu.js'),
  { initWindow } = require('./main/window.js');

function init() {
  // init window
  const options = { width: 800, height: 600 },
    windowUrl = 'file://' + resolve(isDev ? __dirname : app.getAppPath(), 'views', 'index.html');
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