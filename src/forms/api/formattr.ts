import { AxiosPromise } from 'axios';
import request from '../../common/request';

export interface AddFormListParamsType {
  parentId: string;
  forms: string;
}

export function addFormList(params: AddFormListParamsType): AxiosPromise<{}> {
  return request('/form/attr/add', {
    method: 'POST',
    data: params,
  });
}

export interface ModifyFormListParamsType {
  parentId: string;
  forms: string;
}

export function modifyFormList(params: ModifyFormListParamsType): AxiosPromise<{}> {
  return request('/form/attr/update', {
    method: 'POST',
    data: params,
  });
}

export interface GetFormListParamsType {
  parentId: string;
}

export function getFormListById(params: GetFormListParamsType): AxiosPromise<{}> {
  return request(`/form/attr/list/${params.parentId}`, {
    method: 'GET',
  });
}

export interface DeleteFormListParamsType {
  _id: string;
}

export function deleteFormList(params: DeleteFormListParamsType): AxiosPromise<{}> {
  return request(`/form/attr/delete/${params._id}`, {
    method: 'DELETE',
  });
}
