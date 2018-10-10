import { Upload, Icon, message, Button, Row, Col } from 'antd';
import { apiKey } from '../../config/tinyPNG.js';
const Dragger = Upload.Dragger;
const { ipcRenderer } = require('electron');
import styled from 'styled-components';

// const props = {
//   // directory: true,
//   multiple: true,
//   listType: 'picture',
//   beforeUpload(file, fileList) {
//     // console.log(file, fileList);
//     // // ipcRenderer.send('upload', {
//     // //   path: file.path,
//     // //   apiKey: window.localStorage.getItem('apiKey') || apiKey
//     // // });
//     return false;
//   },
//   onChange(info) {
//     info.fileList.forEach(f => {
//       f.percent = 100;
//       f.status = 'done';
//     });
//     console.log(info.file, info.fileList);
//   }
// };

// const FileDragArea = function() {
//   return (
//     <Dragger {...props}>
//       <p className="ant-upload-drag-icon">
//         <Icon type="inbox" />
//       </p>
//       <p className="ant-upload-text">
//         Click or drag file to this area to upload
//       </p>
//       <p className="ant-upload-hint">
//         Support for a single or bulk upload. Strictly prohibit from compressing
//         company data or other band files
//       </p>
//     </Dragger>
//   );
// };


const Container = styled.div`
  position: relative;
  height: 100vh;
`;

const DraggerStyled = styled(Dragger)`
  .ant-upload {
    height: 150px;
  }
  .ant-upload-list {
    max-height: calc(100vh - 210px);
    overflow: scroll;
  }
`;

const Bottom = styled.div`
  position absolute;
  bottom: 0;
  padding: 10px;
  width: 100%;
`;

class FileDragArea extends React.Component {
  state = {
    fileList: [],
    compressing: false
  };

  handleUpload = () => {
    this.setState({
      compressing: true
    });
    console.log(this.state.fileList);
  }

  render() {
    const props = {
      directory: true,
      fileList: this.state.fileList,
      multiple: true,
      onRemove: (file) => {
        this.setState(({ fileList}) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);

          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: (file) => {
        if (['image/png', 'image/jpeg'].includes(file.type)) {
          this.setState(({fileList}) => ({
            fileList: [...fileList, file]
          }));
        }
        return false;
      }
    };
    return (
      <Container>
        <DraggerStyled {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          {/* <p className="ant-upload-text">
            点击或者将图片拖拽到该区域压缩
          </p> */}
          <p className="ant-upload-hint">
            点击或将图片拖拽到该区域进行压缩
          </p>
        </DraggerStyled>
        <Bottom>
          <Row type="flex" justify="center">
            <Button block={true} disabled={this.state.fileList.length === 0} loading={this.state.compressing} onClick={this.handleUpload} size="large" type="primary">
              {this.state.compressing ? '正在压缩...' : '压缩图片'}
            </Button>
          </Row>
        </Bottom>
      </Container>
    );
  }
}

export default FileDragArea;
