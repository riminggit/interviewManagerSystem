import request from '@/utils/request';
// import type { TableListParams, TableListItem } from './data.d';

//查询面试记录
export async function queryUserInterview(params: { key: number[] }) {
    return request('/api/queryUserInterview', {
      method: 'POST',
      data: {
        ...params,
      },
    });
}

//查询用户
export async function queryUser(params: { key: number[] }) {
    return request('/api/queryUser', {
      method: 'POST',
      data: {
        ...params,
      },
    });
  }
