import { render } from 'react-dom';
import App from './view/App.js';

function disableDragFile () {
  document.addEventListener('drop', e => {
    e = e || event;
    e.preventDefault();
  }, false);

  document.addEventListener('dragover', e => {
    e = e || event;
    e.preventDefault();
  }, false);
};
disableDragFile();

render(
  <App />
, document.getElementById('root'));
