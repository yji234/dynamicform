import React, { lazy, Suspense } from 'react';
import BlankLayout from '../layout/BlankLayout';
import NavLayout from '../layout/NavLayout';

const SuspenseComponent = (Component: React.FC) => (props: JSX.IntrinsicAttributes &{ children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <Component {...props} />
  </Suspense>
);

const LoginComponent = lazy(() => import('../account/view/Login'));

const ReviewComponent = lazy(() => import('../review/view/Review'));
const ReviewManageComponent = lazy(() => import('../review/view/Manage'));

const MenuListComponent = lazy(() => import('../menu/view/MenuManage'));

const FormList = lazy(() => import('../forms/view/FormList'));
const CreateFormSetAttr = lazy(() => import('../forms/view/CreateFormSetAttr'));

export interface RouteType{
  key?: string;
  name?: string,
  path: string; // URL 中的路径。
  exact?: boolean;  // 当前路由path的路径采用精确匹配：默认为false，如果为true时需要和路由相同时才能匹配，但是如果有/也是可以匹配上的；
  strict?: boolean; // 默认为false，如果为true时，路由后面有斜杠而url中没有斜杠是不匹配的；
  component: React.FC<{routes: any}>; // 当匹配到 URL 时，单个的组件会被渲染。
  routes?: Array<RouteType>;  // children
  redirect?: string;  // 重定向
}

const staticRoutes: Array<RouteType> = [
  {
    path: '/',
    exact: true,
    strict: true,
    redirect: '/login',
    component: SuspenseComponent(LoginComponent),
  },
  {
    path: '/login',
    exact: true,
    component: BlankLayout,
    routes: [
      {
        path: '/login',
        name: 'login',
        exact: true,
        component: SuspenseComponent(LoginComponent),
      },
    ],
  },
  {
    path: '/formother',
    component: NavLayout,
    routes: [
      {
        path: '/formother/create-form-set-attr/:parentId/:operateType',
        exact: true,
        component: SuspenseComponent(CreateFormSetAttr),
      },
      {
        path: '/formother/review/:formId',
        exact: true,
        component: SuspenseComponent(ReviewComponent),
      },
    ],
  },
];

const handleDynamicRoutes = () => {
  const menuListStr: any = sessionStorage.getItem('menuList');
  if(!menuListStr) {
    return;
  }
  const menuList = JSON.parse(menuListStr)
  // console.log('menuList', menuList);
  // 父菜单
  const parentMenuRoutes: any = [];
  const parentMenu = menuList.filter((item: any) => !item.parentId);
  parentMenu.forEach((item: any) => {
    parentMenuRoutes.push({
      path: item.to,
      component: NavLayout,
      routes: [],
      _id: item._id,
      parentId: item.parentId,
    })
  });
  // 子菜单
  const childrenMenu = menuList.filter((item: any) => item.parentId);
  childrenMenu.forEach((subItem: any) => {
    parentMenuRoutes.forEach((item: any) => {
      if(subItem.parentId === item._id) {
        item.routes = [
          ...item.routes,
          {
            path: subItem.formId ? subItem.to + '/:formId?' : subItem.to,
            name: subItem.to,
            exact: true,
            component:
              subItem.formId
                ? subItem.formIdType === 'list'
                  ? SuspenseComponent(ReviewManageComponent)
                  : SuspenseComponent(ReviewComponent)
                : subItem.to.indexOf('/menu/manage') !== -1
                  ? SuspenseComponent(MenuListComponent)
                  : SuspenseComponent(FormList),
            _id: subItem._id,
            parentId: subItem.parentId,
          }
        ];
      }
    })
  })
  // console.log('parentMenuRoutes', parentMenuRoutes);
  return parentMenuRoutes;
};

const dynamicRoutes = handleDynamicRoutes() ? handleDynamicRoutes() : [];
// console.log('dynamicRoutes', dynamicRoutes)

const routes: Array<RouteType> = [
  ...staticRoutes,
  ...dynamicRoutes,
];

export default routes;
