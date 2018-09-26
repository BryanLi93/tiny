import { Upload, Icon, message } from 'antd';
const Dragger = Upload.Dragger;
const { ipcRenderer } = require('electron');

const props = {
  multiple: true,
  beforeUpload (file) {
    ipcRenderer.send('upload', file.path);
    console.log(file.path);
    return false;
  },
};

const FileDragArea = function () {
  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <Icon type="inbox" />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
    </Dragger>
  )
}

export default FileDragArea;