import { AxiosPromise } from 'axios';
import request from '../../common/request';

export interface GetFormListParamsType {
  pageNum: number;
  pageSize: number;
}

export function getFormList(params: GetFormListParamsType): AxiosPromise<{}> {
  return request(`/getDynamicforms?pageNum=${params.pageNum}&pageSize=${params.pageSize}`, {
    method: 'GET',
  });
}

export interface AddFormParamsType {
  name: string;
  desc: string;
  status: boolean;
}

export function addForm(params: AddFormParamsType): AxiosPromise<{}> {
  return request('/addForm', {
    method: 'POST',
    data: params,
  });
}

export interface DeleteFormParamsType {
  id: string;
}

export function deleteForm(params: DeleteFormParamsType): AxiosPromise<{}> {
  return request(`/deleteForm/${params.id}`, {
    method: 'DELETE',
  });
}

export interface ModifyStatusParamsType {
  id: string;
  status: boolean;
}

export function modifyStatus(params: ModifyStatusParamsType): AxiosPromise<{}> {
  return request(`/modifyStatus/${params.id}/${params.status}`, {
    method: 'GET',
  });
}
