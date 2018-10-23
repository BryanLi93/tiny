import { Upload, Icon, Button, Row, message } from 'antd';
import styled from 'styled-components';
import { sendCompress } from '../service/compressService.js';

const Dragger = Upload.Dragger;

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
    overflow-y: scroll;
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
    sendCompress(this.state.fileList).then(({ success, msg }) => {
      if (success) {
        message.success(msg);
        this.setState({
          fileList: []
        });
      } else {
        message.error(msg);
      }
      this.setState({
        compressing: false
      });
    });
  };

  render() {
    const props = {
      accept: '.jpg, .png',
      fileList: this.state.fileList,
      multiple: true,
      onRemove: file => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);

          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        if (['image/png', 'image/jpeg'].includes(file.type)) {
          this.setState(({ fileList }) => ({
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
          <p className="ant-upload-hint">点击或将图片拖拽到该区域进行压缩</p>
        </DraggerStyled>
        <Bottom>
          <Row type="flex" justify="center">
            <Button
              block={true}
              disabled={this.state.fileList.length === 0}
              loading={this.state.compressing}
              onClick={this.handleUpload}
              size="large"
              type="primary"
            >
              {this.state.compressing ? '正在压缩...' : '压缩图片'}
            </Button>
          </Row>
        </Bottom>
      </Container>
    );
  }
}

export default FileDragArea;
