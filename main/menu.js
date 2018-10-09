const { app, Menu, dialog } = require('electron'),
  { resolve } = require('path'),
  { isDev } = require('../config/env.js'),
  { initWindow } = require('./window.js');

const templete = [];
menu = null;
if (process.platform === 'darwin') {
  templete.unshift(
    {
      label: app.getName(),
      submenu: [
        {
          label: '偏好设置...',
          accelerator: 'CmdOrCtrl+,',
          click() {
            const options = { width: 600, height: 600 },
              windowUrl = isDev()
                ? 'http://localhost:8080/#/menu'
                : `file://${resolve(
                    app.getAppPath(),
                    'dist/web/index.html/#/menu'
                  )}`;
            let menuWindow;
            function createWindow() {
              menuWindow = initWindow(windowUrl, options);
              menuWindow.on('closed', () => {
                menuWindow = null;
              });
            }
            createWindow();
            //TODO: 现在跳转是先打开主页，然后主进程发送打开菜单页的消息，渲染进程再跳转，延时的方法需要优化下
            // setTimeout(() => {
            //   menuWindow.webContents.send('openMenu');
            // }, 1000);
          }
        }
      ]
    },
    {
      label: '编辑',
      submenu: [
        { label: '撤销', role: 'undo' },
        { label: '恢复', role: 'redo' },
        { type: 'separator' },
        { label: '剪切', role: 'cut' },
        { label: '复制', role: 'copy' },
        { label: '粘贴', role: 'paste' },
        { label: '全选', role: 'selectall' }
      ]
    },
    {
      role: '窗口',
      submenu: [{ role: 'minimize' }, { role: 'close' }]
    }
  );
}

exports.createMenu = function() {
  Menu.setApplicationMenu(Menu.buildFromTemplate(templete));
};

exports.templete = templete;
