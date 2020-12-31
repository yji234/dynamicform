import React, { FC, useCallback, useEffect, useState } from 'react';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getMenu } from '../../menu/api/index';

const { SubMenu } = Menu;

const MenuList: FC<{}> = () => {
  const [menuList, setMenuList] = useState<any>([]);

  const handleDoMenu = useCallback((params) => {
    // 父菜单
    const parentMenu = params.filter((item: any) => !item.parentId);
    parentMenu.forEach((item: any) => {
      item.children = [];
    });
    // 子菜单
    const childrenMenu = params.filter((item: any) => item.parentId);
    childrenMenu.forEach((subItem: any) => {
      parentMenu.forEach((item: any) => {
        if(subItem.parentId === item._id) {
          item.children = [...item.children, subItem];
        }
      })
    })
    setMenuList([...parentMenu]);
  }, []);

  const handleGetMenu = useCallback(() => {
    getMenu().then((res) => {
      handleDoMenu(res.data);
    });
  }, [handleDoMenu]);

  useEffect(() => {
    handleGetMenu();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Menu
      mode="inline"
      defaultOpenKeys={['菜单管理']}
      defaultSelectedKeys={['菜单管理']}
      style={{ height: '100%', borderRight: 0 }}
    >
      {
        menuList && menuList.length > 0 && menuList.map((item: any) => (
          <SubMenu
            key={item._id}
            icon={<UserOutlined />}
            title={item.name}
          >
            {
              item && item.children && item.children.length > 0 && item.children.map((subItem: any) => (
                <Menu.Item key={subItem._id}>
                  <Link to={subItem.formId ? subItem.to + '/' + subItem.formId : subItem.to}>{subItem.name}</Link>
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
