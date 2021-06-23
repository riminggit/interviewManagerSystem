
export type queryTagParams = {
  id?: number;
  name?: string;
};

export type addTagParams = {
  name?: string;
};

export type tagListData = [{
  id?: number;
  name?: string;
  is_use?: number;
}];

export type queryTypeParams = {
  id?: number;
  name?: string;
  classify_id?: number;
};

export type typeListData = [{
  id?: number;
  name?: string;
  classify_id?: number;
  is_use?: number;
  classify?: any;
  change?:number;
}];

export type queryClassifyParams = {
  id?: number;
  name?: string;
};