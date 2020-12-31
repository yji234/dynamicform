import axios, { AxiosInstance } from 'axios';
import { message } from 'antd';

const server: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8888/',
  timeout: 20000,
});

server.interceptors.request.use((options) => {
  const configs = { ...options };
  return configs;
});

server.interceptors.response.use((res): any => {
  const { data } = res;
  if (/^2\d+/.test(data.status)) {
    return Promise.resolve(data);
  }
}, (error) => {
  console.log(error);
  const errorStatus = error.request && error.request.status;
  let errorMsg = '';
  if (errorStatus || errorStatus === 0) {
    switch (errorStatus) {
      case 403:
        errorMsg = '403 禁止访问页面，请查看其他页面';
        break;
      case 404:
        errorMsg = '404 没有找到相应内容，请查看其他页面';
        break;
      case 500:
        errorMsg = '500 服务器异常，请稍后重试';
        break;
      case 502:
        errorMsg = '502 请求失败，请稍后重试';
        break;
      case 0:
        errorMsg = '服务器连接超时，请重新尝试';
        break;
      default:
        errorMsg = '服务器异常，请重新尝试';
    }
  }
  message.info({ message: errorMsg || '服务器异常，请重新尝试' });
  return Promise.reject(new Error(errorMsg));
});

export default server;
