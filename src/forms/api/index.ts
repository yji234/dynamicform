import { AxiosPromise } from 'axios';
import request from '../../common/request';

export interface GetFormListParamsType {
  pageNum: number;
  pageSize: number;
}

export function getFormList(params: GetFormListParamsType): AxiosPromise<{}> {
  return request(`/form/list?pageNum=${params.pageNum}&pageSize=${params.pageSize}`, {
    method: 'GET',
  });
}

export interface AddFormParamsType {
  name: string;
  desc: string;
  status: boolean;
}

export function addForm(params: AddFormParamsType): AxiosPromise<{}> {
  return request('/form/add', {
    method: 'POST',
    data: params,
  });
}

export interface DeleteFormParamsType {
  id: string;
}

export function deleteForm(params: DeleteFormParamsType): AxiosPromise<{}> {
  return request(`/form/delete/${params.id}`, {
    method: 'DELETE',
  });
}

export interface ModifyStatusParamsType {
  id: string;
  status: boolean;
}

export function modifyStatus(params: ModifyStatusParamsType): AxiosPromise<{}> {
  return request(`/form/update/status/${params.id}/${params.status}`, {
    method: 'GET',
  });
}
