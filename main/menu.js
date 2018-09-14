const { app, Menu } = require('electron'),
  { resolve } = require('path'),
  { isDev } = require('../config/env.js'),
  { initWindow } = require('./window.js');

const templete = []
menu = null;
if (process.platform === 'darwin') {
  templete.unshift({
    label: app.getName(),
    submenu: [
      {
        label: 'Preferences...',
        click() {
          const options = { width: 800, height: 600 },
            windowUrl = isDev() ? 'http://localhost:8081' : `file://${resolve(app.getAppPath(), 'dist/web/index.html')}`;
          let menuWindow;
          function createWindow() {
            menuWindow = initWindow(windowUrl, options);
            menuWindow.on('closed', () => {
              menuWindow = null;
            });
          }
          createWindow();
        },
      },
    ],
  });
};

exports.createMenu = function () {
  Menu.setApplicationMenu(Menu.buildFromTemplate(templete));
};

exports.templete = templete;