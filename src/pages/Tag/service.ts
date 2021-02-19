import request from '@/utils/request';
// import type { TableListParams, TableListItem } from './data.d';


//查询标签
export async function queryTag(params: { key: number[] }) {
    return request('/api/queryTag', {
      method: 'POST',
      data: {
        ...params,
      },
    });
}

//新增标签
export async function addTag(params: { key: number[] }) {
    return request('/api/addTag', {
      method: 'POST',
      data: {
        ...params,
      },
    });
}
