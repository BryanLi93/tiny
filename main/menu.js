const { app, Menu, dialog } = require('electron'),
  { join } = require('path'),
  { format } = require('url'),
  { isDev } = require('../config/env.js'),
  { initWindow } = require('./window.js');

const templete = [
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
    label: '窗口',
    role: 'window',
    submenu: [
      { label: '最小化', role: 'minimize' },
      { label: '关闭窗口', role: 'close' }
    ]
  },
  {
    label: '帮助',
    role: 'help',
    submenu: [{ label: '切换开发者人员工具', role: 'toggledevtools' }]
  }
];

let menuWindow;

function createMenuWindow() {
  const options = { width: 600, height: 600 },
    // windowUrl = isDev()
    //   ? 'http://localhost:8080/#/menu'
    //   :  `file://${resolve(app.getAppPath(), 'dist/web/index.html#/menu')}`;
    windowUrl = isDev()
      ? format({
          protocol: 'http:',
          slashes: true,
          host: 'localhost:8080',
          hash: '/menu'
        })
      : format({
          protocol: 'file:',
          slashes: true,
          pathname: join(app.getAppPath(), 'dist/web/index.html'),
          hash: '/menu'
        });
  menuWindow = initWindow(windowUrl, options);
  menuWindow.on('closed', () => {
    menuWindow = null;
  });
}

const preferencesAction = () => {
  if (menuWindow) {
    menuWindow.show();
  } else {
    createMenuWindow();
  }
};

if (process.platform === 'darwin') {
  templete.unshift({
    label: 'Tiny',
    submenu: [
      { label: '关于 Tiny', role: 'about' },
      { type: 'separator' },
      {
        label: '偏好设置...',
        accelerator: 'CmdOrCtrl+,',
        click: preferencesAction
      },
      { type: 'separator' },
      { label: '服务', role: 'services', submenu: [] },
      { type: 'separator' },
      { label: '隐藏 Tiny', role: 'hide' },
      { label: '隐藏其他', role: 'hideothers' },
      { label: '全部显示', role: 'unhide' },
      { type: 'separator' },
      { label: '退出 Tiny', role: 'quit' }
    ]
  });
} else {
  templete[0].submenu = templete[0].submenu.concat([
    {
      type: 'separator'
    },
    {
      label: '偏好设置...',
      accelerator: 'CmdOrCtrl+,',
      click: preferencesAction
    }
  ]);
}

exports.createMenu = function() {
  Menu.setApplicationMenu(Menu.buildFromTemplate(templete));
};
