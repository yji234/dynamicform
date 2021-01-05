import React, { FC, useCallback, useEffect, useState } from 'react';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const { SubMenu } = Menu;
const rootSubmenuKeys: any = [];

const MenuList: FC<{}> = () => {
  const location = useLocation();
  const [menuList, setMenuList] = useState<any>([]);
  const [openKeys, setOpenKeys] = useState<any>([]);
  const [selectedKeys, setSelectedKeys] = useState<any>([]);

  const handleDoMenu = useCallback((params) => {
    // 父菜单
    const parentMenu = params.filter((item: any) => !item.parentId);
    parentMenu.forEach((item: any) => {
      item.children = [];
      rootSubmenuKeys.push(item._id);
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
    // console.log('parentMenu', parentMenu);
    // console.log(parentMenu[0]._id)
    // console.log(parentMenu[0].children[0]._id);
    setMenuList([...parentMenu]);
  }, []);

  const handleGetMenu = useCallback(() => {
    const menuListStr: any = sessionStorage.getItem('menuList');
    const menuList = JSON.parse(menuListStr);
    // console.log('menuList', menuList);
    handleDoMenu(menuList);
    // getMenu().then((res) => {
    //   handleDoMenu(res.data);
    // });
  }, [handleDoMenu]);

  const handleOpenChange = useCallback((keys) => {
    console.log('keys', keys);
    const latestOpenKey = keys.find((key: any) => openKeys.indexOf(key) === -1);
    console.log('latestOpenKey', latestOpenKey);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    // console.log(rootSubmenuKeys);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  }, [openKeys]);

  const handleClickMenuItem = useCallback(({ item, key, keyPath, domEvent }) => {
    console.log('item', item);
    console.log('key', key);
    console.log('keyPath', keyPath);
    setOpenKeys([keyPath[1]]);
    setSelectedKeys([key]);
  }, []);

  useEffect(() => {
    handleGetMenu();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetDefaultOpenKeysAndSelectedKeys = useCallback(() => {
    const pathnameList = location.pathname ? location.pathname.split('/') : [];
    pathnameList.pop();
    const newPathname = pathnameList.join('/');
    const menuListStr: any = sessionStorage.getItem('menuList');
    const menuList = JSON.parse(menuListStr);
    const child = menuList.filter((item: any) => item.to === newPathname)[0];
    const parent = menuList.filter((item: any) => item._id === child.parentId)[0];
    setOpenKeys([parent._id]);
    setSelectedKeys([child._id]);
  }, [location]);

  useEffect(() => {
    handleSetDefaultOpenKeysAndSelectedKeys();
  }, [handleSetDefaultOpenKeysAndSelectedKeys]);

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={handleOpenChange}
      onClick={handleClickMenuItem}
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
                  <Link
                    to={
                      subItem.formId
                        ? subItem.jumpTo
                          ? subItem.to + '/' + subItem.formId + '?jumpTo=' + subItem.jumpTo
                          : subItem.to + '/' + subItem.formId
                        : subItem.to
                    }
                  >
                    {subItem.name}
                  </Link>
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
