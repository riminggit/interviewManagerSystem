import request from '@/utils/request';
// import type { TableListParams, TableListItem } from './data.d';


//查询公司数据
export async function queryCompany(params: { key: number[] }) {
    return request('/api/queryCompany', {
      method: 'POST',
      data: {
        ...params,
      },
    });
}

//新增公司数据
export async function addCompany(params: { key: number[] }) {
    return request('/api/addCompany', {
      method: 'POST',
      data: {
        ...params,
      },
    });
}
