import { apiKey } from '../../config/tinyPNG.js';
import { local } from '../util/storage.js';
const { ipcRenderer } = require('electron');

const sendCompress = fileList => {
  const key = local.get('apiKey') || apiKey,
    filePathList = fileList.map(f => f.path),
    isOverride = local.get('isOverride'),
    overrideDir = local.get('overrideDir');

  return new Promise((resolve, reject) => {
    ipcRenderer.on('compress:success', () => {
      resolve({ success: true, msg: '压缩成功～' });
    });
    ipcRenderer.on('compress:fail', () => {
      resolve({ success: false, msg: '压缩失败！' });
    });
    ipcRenderer.send('compress', {
      key,
      filePathList,
      isOverride,
      overrideDir
    });
  });
};

export { sendCompress };
