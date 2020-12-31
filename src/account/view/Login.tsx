import { Button } from 'antd';
import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom'
import { getMenu } from '../../menu/api/index';

const Login: FC<{}> = () => {
  const history = useHistory();
  
  const handleGetMenu = useCallback(() => {
    getMenu().then((res) => {
      sessionStorage.setItem('menuList', JSON.stringify(res.data))
      const menuList = sessionStorage.getItem('menuList');
      console.log('menuList', menuList);
      if(menuList) {
        history.push('/menu/manage')
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
