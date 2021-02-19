import request from '@/utils/request';
// import type { TableListParams, TableListItem } from './data.d';


//新增题目
export async function addTopic(params: { key: number[] }) {
    return request('/api/addTopic', {
      method: 'POST',
      data: {
        ...params,
      },
    });
}

//查询分类
export async function queryClassify(params: { key: number[] }) {
    return request('/api/queryClassify', {
      method: 'POST',
      data: {
        ...params,
      },
    });
}

//查询公司数据
export async function queryCompany(params: { key: number[] }) {
    return request('/api/queryCompany', {
      method: 'POST',
      data: {
        ...params,
      },
    });
}

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

//查询题目分类下的类型
export async function queryType(params: { key: number[] }) {
    return request('/api/queryType', {
      method: 'POST',
      data: {
        ...params,
      },
    });
}

//查询题目
export async function queryTopic(params: { key: number[] }) {
    return request('/api/queryTopic', {
      method: 'POST',
      data: {
        ...params,
      },
    });
}
