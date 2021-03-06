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
