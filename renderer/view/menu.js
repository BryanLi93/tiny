import { Tabs } from 'antd';
import MenuMain from '../compoenent/Menu.Main.js';
import styled from 'styled-components';

const TabPane = Tabs.TabPane;

const TabsStyled = styled(Tabs)`
  padding: 6px;
`;

export default class Menu extends React.Component {
  render() {
    return (
      <div>
        <TabsStyled type="card">
          <TabPane tab="基本" key="1">
            <MenuMain />
          </TabPane>
          {/* <TabPane tab="Tab 2" key="2"></TabPane>
          <TabPane tab="Tab 3" key="3"></TabPane> */}
        </TabsStyled>
      </div>
    );
  }
}
