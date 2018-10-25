const { BrowserWindow } = require('electron');

exports.initWindow = (windowUrl, options) => {
  const _window = new BrowserWindow(options);
  _window.loadURL(windowUrl);
  return _window;
};
