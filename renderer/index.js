import { render } from 'react-dom';
import router from './router/router.js';

// 静止向 app 拖拽文件时，浏览器直接打开文件
function disableDragFile() {
  document.addEventListener(
    'drop',
    e => {
      e = e || event;
      e.preventDefault();
    },
    false
  );

  document.addEventListener(
    'dragover',
    e => {
      e = e || event;
      e.preventDefault();
    },
    false
  );
}
disableDragFile();

render(router, document.getElementById('root'));
