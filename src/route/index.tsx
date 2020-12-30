import React, { lazy, Suspense } from 'react';
import BlankLayout from '../layout/BlankLayout';
import NavLayout from '../layout/NavLayout';

const SuspenseComponent = (Component: React.FC) => (props: JSX.IntrinsicAttributes &{ children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <Component {...props} />
  </Suspense>
);

const LoginComponent = lazy(() => import('../account/view/Login'));

const ProjectInfoComponent = lazy(() => import('../project/view/ProjectInfo'));
const MarkInfoComponent = lazy(() => import('../project/view/MarkInfo'));
const ProcessAllotTaskComponent = lazy(() => import('../project/view/ProcessAllotTask'));

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

const routes: Array<RouteType> = [
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
    path: '/project',
    component: NavLayout,
    routes: [
      {
        path: '/project/project-info',
        name: 'projectInfo',
        exact: true,
        component: SuspenseComponent(ProjectInfoComponent),
      },
      {
        path: '/project/mark-info',
        name: 'markInfo',
        exact: true,
        component: SuspenseComponent(MarkInfoComponent),
      },
      {
        path: '/project/process-allot-task',
        name: 'processAllotTaskComponent',
        exact: true,
        component: SuspenseComponent(ProcessAllotTaskComponent),
      },
    ],
  }
];

export default routes;