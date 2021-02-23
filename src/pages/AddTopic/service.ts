import request from '@/utils/request';
import type {
  queryTopicParams,
  addTopicParams,
  queryClassifyParams,
  queryCompanyParams,
  queryKnowledgeParams,
  queryTagParams,
  queryTypeParams
} from './data.d';


//新增题目
export async function addTopic(params: addTopicParams) {
  return request('/api/addTopic', {
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

//查询公司数据
export async function queryCompany(params: queryCompanyParams) {
  return request('/api/queryCompany', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//查询知识点数据
export async function queryKnowledge(params:queryKnowledgeParams) {
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

//查询题目分类下的类型
export async function queryType(params: queryTypeParams) {
  return request('/api/queryType', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//查询题目
export async function queryTopic(params:queryTopicParams) {
  return request('/api/queryTopic', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
