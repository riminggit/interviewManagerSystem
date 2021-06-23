import request from '@/utils/request';
import type { queryTagParams,queryKnowlageParams } from './data.d';


//查询知识点数据
export async function queryKnowledge(params: queryKnowlageParams) {
    return request('/api/queryKnowledge', {
      method: 'POST',
      data: {
        ...params,
      },
    });
}

//查询标签
export async function queryTag(params:queryTagParams) {
  return request('/api/queryTag', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

