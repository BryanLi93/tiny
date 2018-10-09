const { ipcMain, dialog } = require('electron'),
  tinify = require('tinify');

// tinify.key = 'QurGWqITbWSRB9tn0EEe3Iv9dzpNYjnP';

ipcMain.on('upload', (event, args) => {
  console.log(args);
  tinify.key = args.apiKey;
  const source = tinify.fromFile(args.path);
  source.toFile(args.path).then(() => {
    dialog.showMessageBox({ message: '图片压缩成功~'});
  });
});