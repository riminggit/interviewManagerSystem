import request from '@/utils/request';
// import type { TableListParams, TableListItem } from './data.d';


//查询分类
export async function queryClassify(params: { key: number[] }) {
    return request('/api/queryClassify', {
      method: 'POST',
      data: {
        ...params,
      },
    });
}

//查询题目分类下的类型
export async function queryType(params: { key: number[] }) {
    return request('/api/queryType', {
      method: 'POST',
      data: {
        ...params,
      },
    });
}

//新增题目分类下的类型
export async function addType(params: { key: number[] }) {
    return request('/api/addType', {
      method: 'POST',
      data: {
        ...params,
      },
    });
}

