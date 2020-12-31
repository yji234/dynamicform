import { AxiosPromise } from 'axios';
import request from '../../common/request';

export interface AddDragSourceParamsType {
  name: string;
  bgColor: string;
}

export function addDragSource(params: AddDragSourceParamsType): AxiosPromise<{}> {
  return request(`/addDragSource`, {
    method: 'POST',
    data: params,
  });
}

export function getDragSource(): AxiosPromise<{}> {
  return request(`/getDragSource`, {
    method: 'GET',
  });
}