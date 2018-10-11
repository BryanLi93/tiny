const { ipcMain } = require('electron');

const onCompress = _window => {
  ipcMain.on('compress', (event, { key, filePathList }) => {
    const tinify = require('tinify');
    tinify.key = key;
    const compressPromiseArr = [];
    filePathList.forEach(path => {
      console.log(path);
      const promise = tinify.fromFile(path).toFile(path);
      compressPromiseArr.push(promise);
    });
    Promise.all(compressPromiseArr)
      .then(res => {
        //TODO:判断是否上传成功
        event.sender.send('compress:success');
      })
      .catch(err => {
        console.log(
          '[compressServie.js/onCompress]压缩出现问题：' + err.message
        );
        event.sender.send('compress:fail');
      });
  });
};

module.exports = {
  onCompress
};
