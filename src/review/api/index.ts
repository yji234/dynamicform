import { AxiosPromise } from 'axios';
import request from '../../common/request';

// export interface GetFormListParamsType {
//   parentId: string;
// }

// export function getFormListById(params: GetFormListParamsType): AxiosPromise<{}> {
//   return request(`/getFormList/${params.parentId}`, {
//     method: 'GET',
//   });
// }

export interface AddFormValueParamsType {
  formId: string;
}

export function addFormValue(params: AddFormValueParamsType): AxiosPromise<{}> {
  return request('/form/value/add', {
    method: 'POST',
    data: params,
  });
}

export interface GetFormValueParamsType {
  formId: string;
  pageNum: number;
  pageSize: number;
}

export function getFormValue(params: GetFormValueParamsType): AxiosPromise<{}> {
  return request(`/form/value/list/${params.formId}`, {
    method: 'GET',
  });
}

export interface DeleteFormValueParamsType {
  _id: string;
}

export function deleteFormValue(params: DeleteFormValueParamsType): AxiosPromise<{}> {
  return request(`/form/value/delete/${params._id}`, {
    method: 'DELETE',
  });
}

export interface GetFormValueItemParamsType {
  _id: string;
}

export function getFormValueItem(params: GetFormValueItemParamsType): AxiosPromise<{}> {
  return request(`/form/value/item/${params._id}`, {
    method: 'GET',
  });
}

export interface ModifyFormValueParamsType {
  _id: string;
  formId: string;
}

export function modifyFormValue(params: ModifyFormValueParamsType): AxiosPromise<{}> {
  return request('/form/value/update ', {
    method: 'POST',
    data: params,
  });
}