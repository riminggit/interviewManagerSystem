import request from '@/utils/request';
// import type { TableListParams, TableListItem } from './data.d';


//用户查询
export async function queryUser(params: { key: number[] }) {
  return request('/api/queryUser', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


//查询用户自己新增的数据
export async function queryUserAddTopic(params: { key: number[] }) {
  return request('/api/queryUserAddTopic', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
