import { AxiosPromise } from 'axios';
import request from '../../common/request';

export interface AddFormListParamsType {
  parentId: string;
  forms: string;
}

export function addFormList(params: AddFormListParamsType): AxiosPromise<{}> {
  return request(`/addFormList`, {
    method: 'POST',
    data: params,
  });
}

export interface ModifyFormListParamsType {
  parentId: string;
  forms: string;
}

export function modifyFormList(params: ModifyFormListParamsType): AxiosPromise<{}> {
  return request(`/modifyFormList`, {
    method: 'POST',
    data: params,
  });
}

export interface GetFormListParamsType {
  parentId: string;
}

export function getFormListById(params: GetFormListParamsType): AxiosPromise<{}> {
  return request(`/getFormList/${params.parentId}`, {
    method: 'GET',
  });
}

export interface DeleteFormListParamsType {
  _id: string;
}

export function deleteFormList(params: DeleteFormListParamsType): AxiosPromise<{}> {
  return request(`/deleteFormList/${params._id}`, {
    method: 'DELETE',
  });
}
