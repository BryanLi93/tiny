const tinify = require('tinify'),
  homePath = require('os').homedir();
  fileDropZone = document.getElementById('file-drop-zone');

tinify.key = 'QurGWqITbWSRB9tn0EEe3Iv9dzpNYjnP';

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

fileDropZone.addEventListener('drop', e => {
  e.preventDefault();
  e.stopPropagation();
  let source;
  // console.log('drop', e.dataTransfer);
  for (let f of e.dataTransfer.files) {
    console.log('File(s) you dragged here: ', f)
    source = tinify.fromFile(f.path);
    source.toFile(`${homePath}/Downloads/${f.name}`);
  }
});

fileDropZone.addEventListener('dragover', function (e) {
  e.preventDefault();
  e.stopPropagation();
});