import React, { FC, useState } from 'react';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

const MenuList: FC<{}> = () => {
  console.log('MenuList');
  const [menuList, setMenuList] = useState<any>([
    {
      title: '项目管理',
      children: [
        {
          content: '项目信息',
          to: '/project/project-info',
        },
        {
          content: '标注信息',
          to: '/project/mark-info',
        },
        {
          content: '流程分配任务',
          to: '/project/process-allot-task',
        },
      ],
    }
  ]);

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['0']}
      defaultOpenKeys={['0']}
      style={{ height: '100%', borderRight: 0 }}
    >
      {
        menuList.map((item: any, index: number) => (
          <SubMenu
            key={index}
            icon={<UserOutlined />}
            title={item.title}
          >
            {
              item.children.map((subItem: any, subIndex: number) => (
                <Menu.Item key={subIndex}>
                  <Link to={subItem.to}>{subItem.content}</Link>
                </Menu.Item>
              ))
            }
          </SubMenu>
        ))
      }
    </Menu>
  );
};

export default MenuList;
