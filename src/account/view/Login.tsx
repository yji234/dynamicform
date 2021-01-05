import { Button } from 'antd';
import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom'
import { getMenu } from '../../menu/api/index';

const Login: FC<{}> = () => {
  const history = useHistory();
  
  const handleGetMenu = useCallback(() => {
    getMenu().then((res) => {
      sessionStorage.setItem('menuList', JSON.stringify(res.data))
      const menuListStr: any = sessionStorage.getItem('menuList');
      // console.log('menuListStr', menuListStr);
      const menuList = JSON.parse(menuListStr);
      // console.log('menuList', menuList)
      // 筛选出第一个子菜单
      const firstChildMenu = menuList.filter((item: any) => (item.parentId === menuList[0]._id))[0];
      // console.log(firstChildMenu);
      if(firstChildMenu) {
        history.push(firstChildMenu.to);
        window.location.reload();
      }
    });
  }, [history]);

  const handleLogin = useCallback(() => {
    // 1、登录成功之后获取权限
    // 2、根据权限获取对应的菜单🌲
    handleGetMenu();
  }, [handleGetMenu]);

  return (
    <div className="login">
      <Button onClick={handleLogin}>登录</Button>
    </div>
  );
};

export default Login;
