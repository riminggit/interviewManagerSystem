
export type queryTopicParams = {
  condition: string;
  pageNum?: number;
  pageSize?: number;
  id?: number;
  title?: string;
  analysis?: string;
  degree?: number;
  level?: number;
  is_base_topic?: number;
  is_important_topic?: number;
  create_at?: Date;
  classify_id?: Array;
  company_id?: Array;
  knowledge_id?: Array;
  tag_id?: Array;
  type_id?: Array;
};

export type queryClassifyParams = {
  id?: number;
  name?: string;
};

export type queryCompanyParams = {
  id?: number;
  company_name?: string;
};

export type queryKnowledgeParams = {
  id?: number;
  title?: string;
  content?: string;
  tag_id?: number;
};

export type queryTagParams = {
  id?: number;
  name?: string;
};

export type queryTypeParams = {
  id?: number;
  name?: string;
  classify_id?: Array;
};


export type addTopicParams = {
  title?: string;
  analysis?: string;
  degree?: number;
  level?: number;
  is_base_topic?: number;
  is_important_topic?: number;
};


export interface ISelectAnalysis {
    validity:boolean,
    content:string
}

