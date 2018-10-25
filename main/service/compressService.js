const { ipcMain } = require('electron');
const fs = require('fs');

/**
 *
 * @param {*} param0
 */
function checkFileds(event, { key, isOverride, overrideDir }) {
  if (!key) {
    event.sender.send('compress:fail', {
      success: false,
      msg: '请输入 ApiKey'
    });
    return false;
  }
  if (!isOverride && !overrideDir) {
    event.sender.send('compress:fail', {
      success: false,
      msg: '请选择压缩后图片放置的文件夹'
    });
    return false;
  }
  return true;
}

/**
 * 解析文件全路径，获取文件名和后缀
 * @param {*} path - 文件全路径
 */
function getFileNameFromPath(path) {
  const platform = process.platform;
  let fileName;
  if (platform === 'darwin' || platform === 'linux') {
    fileName = path.split('/').pop();
  } else if (platform === 'win32') {
    fileName = path.split('\\').pop();
  }
  return fileName;
}

/**
 * 主进程接收到压缩命令，进行压缩操作
 */
const onCompress = () => {
  ipcMain.on(
    'compress',
    (event, { key, filePathList, isOverride, overrideDir }) => {
      if (checkFileds(event, { key, filePathList, isOverride, overrideDir })) {
        const tinify = require('tinify');
        tinify.key = key;
        const compressPromiseArr = []; // 存储每一个图片压缩进程的 promise

        filePathList.forEach(sourcePath => {
          let outputPath = isOverride
            ? sourcePath
            : `${overrideDir}/${getFileNameFromPath(sourcePath)}`;
          // 在用户制定输出文件夹模式下，对输出文件进行扫描、重命名文件，防止误覆盖
          if (!isOverride) {
            let index = 0;
            // 校验输出文件夹是否有重名图片
            while (index > -1) {
              let checkPath = outputPath;
              // index 为 0 表示原文件名，依次计算（1）、（2）、（3）等后缀
              if (index > 0) {
                checkPath = checkPath
                  .replace('.jpg', `(${index}).jpg`)
                  .replace('.png', `(${index}).png`);
              }
              try {
                // 有重名文件，修改输出文件名
                fs.readFileSync(checkPath);
                index++;
              } catch {
                // 没有读到重名文件，生成输出路径
                outputPath = checkPath;
                index = -1;
              }
            }
          }
          // 用 tinify 库进行图片压缩
          const promise = tinify.fromFile(sourcePath).toFile(outputPath);
          compressPromiseArr.push(promise);
        });
        Promise.all(compressPromiseArr)
          .then(res => {
            event.sender.send('compress:success');
          })
          .catch(err => {
            event.sender.send('compress:fail', {
              success: false,
              msg: err.message
            });
          });
      }
    }
  );
};

module.exports = {
  onCompress
};
