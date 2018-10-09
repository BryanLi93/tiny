import { render } from 'react-dom';
import router from './router/router.js';

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
