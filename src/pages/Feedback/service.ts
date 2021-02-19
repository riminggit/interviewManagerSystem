import request from '@/utils/request';
// import type { TableListParams, TableListItem } from './data.d';


//查询用户反馈
export async function queryUserFeedback(params: { key: number[] }) {
    return request('/api/queryUserFeedback', {
      method: 'POST',
      data: {
        ...params,
      },
    });
}
