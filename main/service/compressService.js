const { ipcMain } = require('electron');
const fs = require('fs');

function getFileNameFromPath(path) {
  return path.split('/').pop();
}

const onCompress = _window => {
  ipcMain.on(
    'compress',
    (event, { key, filePathList, isOverride, overrideDir }) => {
      const tinify = require('tinify');
      tinify.key = key;
      const compressPromiseArr = [];

      filePathList.forEach(sourcePath => {
        let outputPath = isOverride
          ? sourcePath
          : `${overrideDir}/${getFileNameFromPath(sourcePath)}`;
        if (!isOverride) {
          let index = 0;
          // 校验输出文件夹是否有重名图片
          while (index > -1) {
            let checkPath = outputPath;
            // index 为 0 表示原文件名，依次计算（1）、（2）、（3）后缀
            if (index > 0) {
              checkPath = checkPath
                .replace('.jpg', `(${index}).jpg`)
                .replace('.png', `(${index}).png`);
            }
            try {
              fs.readFileSync(checkPath);
              index++;
            } catch {
              outputPath = checkPath;
              index = -1;
            }
          }
        }
        const promise = tinify.fromFile(sourcePath).toFile(outputPath);
        compressPromiseArr.push(promise);
      });
      Promise.all(compressPromiseArr)
        .then(res => {
          event.sender.send('compress:success');
        })
        .catch(err => {
          console.log(
            '[compressServie.js/onCompress]压缩出现问题：' + err.message
          );
          event.sender.send('compress:fail');
        });
    }
  );
};

module.exports = {
  onCompress
};
