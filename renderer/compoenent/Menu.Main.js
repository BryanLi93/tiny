import { Form, Input, Button, Radio, Icon, message } from 'antd';
import styled from 'styled-components';
import ApiKeyPopover from './Menu.Main.Popover.ApiKey.js';
import { apiKey as key } from '../../config/tinyPNG.js';
import { local } from '../util/storage.js';

const { dialog } = require('electron').remote;

const FormItem = Form.Item,
  RadioGroup = Radio.Group;

const NotOverrideContainer = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;
`;

const SelectDirIcon = styled(Icon)`
  font-size: 18px;
  vertical-align: middle;
  margin-right: 5px;
`;

const MenuMain = Form.create()(
  class extends React.Component {
    state = {
      isOverride: local.get('isOverride') === false ? false : true,
      overrideDir: local.get('overrideDir')
    };

    save = () => {
      const { apiKey } = this.props.form.getFieldsValue();
      if (apiKey) {
        local.set('apiKey', apiKey);
      }
      local.set('isOverride', this.state.isOverride);
      local.set('overrideDir', this.state.overrideDir);
      message.success('保存成功~');
    };
    changeIsOverride = e => {
      this.setState({
        isOverride: e.target.value
      });
    };
    selectOverrideDir = () => {
      if (!this.state.isOverride) {
        dialog.showOpenDialog({ properties: ['openDirectory'] }, filePaths => {
          if (filePaths) {
            this.setState({
              overrideDir: filePaths[0]
            });
          }
        });
      }
    };

    render() {
      const { getFieldDecorator } = this.props.form;
      const { isOverride, overrideDir } = this.state;
      const inputFormItemLayout = {
        labelCol: {
          span: 5
        },
        wrapperCol: {
          span: 16
        }
      };
      const radioFormItemLayout = {
        labelCol: {
          span: 5
        },
        wrapperCol: {
          span: 19
        }
      };
      const tailFormItemLayout = {
        wrapperCol: {
          span: 19,
          offset: 5
        }
      };

      return (
        <Form>
          <FormItem label="ApiKey" {...inputFormItemLayout}>
            {getFieldDecorator('apiKey', {
              initialValue: window.localStorage.getItem('apiKey') || key
            })(<Input addonAfter={<ApiKeyPopover />} />)}
          </FormItem>
          <FormItem label="覆盖原图" {...radioFormItemLayout}>
            <RadioGroup onChange={this.changeIsOverride} value={isOverride}>
              <div>
                <Radio value={true}>是</Radio>
              </div>
              <NotOverrideContainer>
                <Radio value={false}>否</Radio>
                <SelectDirIcon
                  type="folder-open"
                  theme="twoTone"
                  twoToneColor={isOverride ? '#aaa' : ''}
                  onClick={this.selectOverrideDir}
                />
                <span title={overrideDir}>{overrideDir}</span>
              </NotOverrideContainer>
            </RadioGroup>
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" onClick={this.save}>
              保存
            </Button>
          </FormItem>
        </Form>
      );
    }
  }
);

export default MenuMain;
