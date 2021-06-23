import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Card,
  Row,
  Col,
  Table,
} from 'antd';
import './index.less';
import { queryTopic, queryClassify, queryCompany, queryKnowledge, queryTag, queryType, addTopic } from './service';
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';



const columns = [{
  title: '题目',
  dataIndex: 'title',
  key: 'title',
  width: "50%"
},
{
  title: '题目类型',
  dataIndex: 'question_type',
  key: 'question_type',
  render: (val: React.ReactNode) => {
    if (val === 1) {
      return (
        <div>选择题</div>
      );
    } else if (val === 2) {
      return (
        <div>解析题</div>
      );
    } else if (val === 3) {
      return (
        <div>选择/解析题</div>
      );
    }
  },
},
{
  title: '难度',
  dataIndex: 'degree',
  key: 'degree',
  render: (val: React.ReactNode) => {
    if (val == 0) {
      return (
        <div>简单</div>
      );
    } else if (val == 1) {
      return (
        <div>中等</div>
      );
    } else if (val == 2) {
      return (
        <div>难</div>
      );
    } else if (val == 3) {
      return (
        <div>极难</div>
      );
    }
  },
},
{
  title: '等级',
  dataIndex: 'level',
  key: 'level',
  render: (val: React.ReactNode) => {
    if (val == 1) {
      return (
        <div>初级</div>
      );
    } else if (val == 2) {
      return (
        <div>中级</div>
      );
    } else if (val == 3) {
      return (
        <div>高级</div>
      );
    } else if (val == 4) {
      return (
        <div>资深</div>
      );
    } else if (val == 5) {
      return (
        <div>专家</div>
      );
    } else if (val == 6) {
      return (
        <div>资深专家</div>
      );
    } else if (val == 7) {
      return (
        <div>研究员</div>
      );
    }
  },
},
{
  title: '重点',
  dataIndex: 'is_important_topic',
  key: 'is_important_topic',
  render: (val: React.ReactNode) => {
    if (val == 0) {
      return (
        <div>否</div>
      );
    } else if (val == 1) {
      return (
        <div>是</div>
      );
    }
  },
},

];


const QueryTopic: React.FC = () => {

  const [topicListData, querytopicListData] = useState([]);
  const [paginationTotal, setpaginationTotal] = useState(0);
  const [loading, setloading] = useState(false);
  const [pageNum, setpageNum] = useState(1);
  const [pageSize, setpageSize] = useState(20);

  let pagination = {
    total: paginationTotal,
    pageSize: pageSize
  }

  let queryTagParam = {
    condition: 'common',
    pageNum: pageNum,
    pageSize: pageSize,
  };

  const topQueryTopic = () => {
    setloading(true)
    queryTopic(queryTagParam).then((res) => {
      if (res.code === 200) {
        querytopicListData(res.data.rows);
        setpaginationTotal(res.data.count)
        setloading(false)
      }
    });
  }

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setpageNum(pagination.current)
    setpageSize(pagination.pageSize)
    topQueryTopic()
  };

  useEffect(() => {
    topQueryTopic()
  }, []);

  return (
    <PageContainer>
      <Card  className='table-card'>
        <Table
          scroll={{y:700}}
          columns={columns}
          dataSource={topicListData}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          expandedRowRender = {expandedRowRender}
          rowKey={(record: any) => record.id}
        />
      </Card>
    </PageContainer>
  );
};

const expandedRowRender = (data: { analysis: any;select_analysis:any; }) => {
  return (<div className='expandedRowRender'>
     <div  dangerouslySetInnerHTML={{__html: data.analysis }} className='analysis'>
    </div>
    <div className='select-analysis'>
       {
         data.select_analysis ? JSON.parse(data.select_analysis).map((item:any,index: any) => {
            <div key={index}>
              {item.content}
              {
                item.validity ? <CheckOutlined /> : <CloseOutlined />
              }
            </div>
         }) : null
       }
    </div>
  </div>);
};

export default QueryTopic;