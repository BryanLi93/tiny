const { ipcMain, dialog } = require('electron'),
  tinify = require('tinify');

tinify.key = 'QurGWqITbWSRB9tn0EEe3Iv9dzpNYjnP';

ipcMain.on('upload', (event, arg) => {
  const source = tinify.fromFile(arg);
  source.toFile(arg);
  dialog.showMessageBox({ message: '图片压缩成功~'});
});