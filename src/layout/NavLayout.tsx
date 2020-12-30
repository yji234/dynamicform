import React, { FC } from 'react';
import { Layout } from 'antd';
import { RouteType } from '../route/index';
import renderRoutes from '../route/renderRoutes';
import './NavLayout.scss'
import MenuList from '../account/component/MenuList';

const { Header, Content, Sider } = Layout;

const NavLayout: FC<{routes: Array<RouteType>}> = ({routes}) => {
  return (
    <div className="nav-layout">
      <Layout>
        <Header></Header>
        <Layout>
          <Sider width={200}>
            <MenuList />
          </Sider>
          <Content className="content">
            {
              renderRoutes(routes)
            }
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default NavLayout;
