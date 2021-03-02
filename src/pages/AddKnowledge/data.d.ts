export type queryTagParams = {
    id?: number;
    name?: string;
 
};

export type queryKnowlageParams = {
    id?: number;
    title?: string;
    content?: string;
    tag_id?: Array;
    pageNum?: number;
    pageSize?: number;
};


export type addKnowlageParams = {
    title?: string;
    content?: string;
    tag_id?: Array;
};
