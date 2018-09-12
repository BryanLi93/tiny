
const { BrowserWindow } = require('electron'),
  { isDev } = require('../config/env.js');

exports.initWindow = (windowUrl, options) => {
  const _window = new BrowserWindow(options);
  _window.loadURL(windowUrl);
  isDev && _window.webContents.openDevTools();
  return _window;
};