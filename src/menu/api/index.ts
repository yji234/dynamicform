import { AxiosPromise } from 'axios';
import request from '../../common/request';

export interface AddMenuParamsType {
  name: string;
  to: string;
  jumpTo: string;
  formIdType: string;
  formId: string;
}

export function addMenu(params: AddMenuParamsType): AxiosPromise<{}> {
  return request('/menu/add', {
    method: 'POST',
    data: params
  });
}

export interface UpdateMenuParamsType {
  _id: string;
  name: string;
  to: string;
  jumpTo: string;
  formIdType: string;
  formId: string;
}

export function updateMenu(params: UpdateMenuParamsType): AxiosPromise<{}> {
  return request('/menu/update', {
    method: 'POST',
    data: params
  });
}

export function getMenu(): AxiosPromise<{}> {
  return request('/menu/list', {
    method: 'GET',
  });
}

export interface DeleteMenuParamsType {
  _id: string;
}

export function deleteMenu(params: DeleteMenuParamsType): AxiosPromise<{}> {
  return request(`/menu/delete/${params._id}`, {
    method: 'DELETE',
  });
}
