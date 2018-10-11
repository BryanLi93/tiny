import { apiKey } from '../../config/tinyPNG.js';
const { ipcRenderer } = require('electron');

const sendCompress = fileList => {
  //TODO:文件压缩后存储的路径，暂时是覆盖原文件
  const key = window.localStorage.getItem('apiKey') || apiKey;
  const filePathList = fileList.map(f => f.path);

  return new Promise((resolve, reject) => {
    ipcRenderer.on('compress:success', () => {
      resolve({ success: true, msg: '压缩成功～' });
    });
    ipcRenderer.on('compress:fail', () => {
      resolve({ success: false, msg: '压缩失败！' });
    });
    ipcRenderer.send('compress', {
      key,
      filePathList
    });
  });
};

export { sendCompress };
