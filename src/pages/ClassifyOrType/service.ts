import request from '@/utils/request';
import type { queryTagParams,addTagParams,queryTypeParams} from './data.d';


//查询标签
export async function queryTag(params:queryTagParams) {
    return request('/api/queryTag', {
      method: 'POST',
      data: {
        ...params,
      },
    });
}


//新增标签
export async function addTag(params:addTagParams) {
    return request('/api/addTag', {
      method: 'POST',
      data: {
        ...params,
      },
    });
}


//查询题目分类下的类型
export async function queryType(params: queryTypeParams) {
  return request('/api/queryType', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
