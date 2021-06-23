import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Card,
  Button,
  Table,
  Input,
} from 'antd';
import './index.less';
import { queryKnowledge, queryTag } from './service';

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '知识点标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '标签ID',
    dataIndex: 'tag_id',
    key: 'tag_id',
  },
  {
    title: '创建时间',
    dataIndex: 'create_at',
    key: 'create_at',
  },
];


const QueryKnowledge: React.FC = () => {
  const [KnowlageListData, queryKnowlageListData] = useState([]);
  const [paginationTotal, setpaginationTotal] = useState(0);
  const [loading, setloading] = useState(false);
  const [pageNum, setpageNum] = useState(1);
  const [pageSize, setpageSize] = useState(20);

  let pagination = {
    total: paginationTotal,
    pageSize: pageSize,
  };

  let queryKnowlageParams = {
    pageNum: pageNum,
    pageSize: pageSize,
  };

  const toQueryKnowlage = () => {
    setloading(true);
    queryKnowledge(queryKnowlageParams).then((res) => {
      setloading(false);
      queryKnowlageListData(res.data.rows);
      setpaginationTotal(res.data.count);
    });
  };

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setpageNum(pagination.current);
    setpageSize(pagination.pageSize);
    toQueryKnowlage();
  };

  useEffect(() => {
    toQueryKnowlage();
  }, []);

  return (
    <PageContainer>
      <Card style={{ width: '100%', overflow: 'auto', height: '100vh' }}>
        <Table
          scroll={{y:700}}
          columns={columns}
          dataSource={KnowlageListData}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          rowKey={(record: any) => record.id}
        />
      </Card>
    </PageContainer>
  );
};

export default QueryKnowledge;
