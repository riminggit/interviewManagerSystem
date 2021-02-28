import request from '@/utils/request';
import type { queryTagParams,addTagParams,queryTypeParams,queryClassifyParams} from './data.d';




//新增题目分类下的类型
export async function addType(params:addTagParams) {
    return request('/api/addType', {
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


//查询分类
export async function queryClassify(params: queryClassifyParams) {
  return request('/api/queryClassify', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}