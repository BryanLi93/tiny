import { Popover, Icon } from 'antd';

const content = (
  <div>
    <span>
      没有自己的 ApiKey？
      <a target="_blank" href="https://tinypng.com/developers">
        点我
      </a>
      申请注册
    </span>
  </div>
);

const ApiKeyPopover = () => {
  return (
    <div>
      <Popover content={content} placement="bottom" trigger="hover">
        <Icon type="info-circle" theme="outlined" />
      </Popover>
    </div>
  );
};

export default ApiKeyPopover;
