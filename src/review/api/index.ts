import { AxiosPromise } from 'axios';
import request from '../../common/request';

export interface GetFormListParamsType {
  parentId: string;
}

export function getFormListById(params: GetFormListParamsType): AxiosPromise<{}> {
  return request(`/getFormList/${params.parentId}`, {
    method: 'GET',
  });
}
