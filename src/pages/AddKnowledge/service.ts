import request from '@/utils/request';
// import type { TableListParams, TableListItem } from './data.d';


//查询知识点数据
export async function queryKnowledge(params: { key: number[] }) {
    return request('/api/queryKnowledge', {
      method: 'POST',
      data: {
        ...params,
      },
    });
}

//查询标签
export async function queryTag(params: { key: number[] }) {
    return request('/api/queryTag', {
      method: 'POST',
      data: {
        ...params,
      },
    });
}

//新增知识点数据
export async function addKnowledge(params: { key: number[] }) {
    return request('/api/queryTag', {
      method: 'POST',
      data: {
        ...params,
      },
    });
}
