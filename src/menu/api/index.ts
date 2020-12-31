import { AxiosPromise } from 'axios';
import request from '../../common/request';

export interface AddMenuParamsType {
  name: string;
  to: string;
  children: string;
}

export function addMenu(params: AddMenuParamsType): AxiosPromise<{}> {
  return request('/addMenu', {
    method: 'POST',
    data: params
  });
}

export interface UpdateMenuParamsType {
  _id: string;
  name: string;
  to: string;
  children: string;
}

export function updateMenu(params: UpdateMenuParamsType): AxiosPromise<{}> {
  return request('/updateMenu', {
    method: 'POST',
    data: params
  });
}

export function getMenu(): AxiosPromise<{}> {
  return request('/getMenu', {
    method: 'GET',
  });
}

export interface DeleteMenuParamsType {
  _id: string;
}

export function deleteMenu(params: DeleteMenuParamsType): AxiosPromise<{}> {
  return request(`/deleteMenu/${params._id}`, {
    method: 'DELETE',
  });
}
