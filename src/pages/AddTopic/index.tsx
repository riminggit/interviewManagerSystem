import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Card,
  Alert,
  Typography,
  Row,
  Col,
  List,
  Button,
  Table,
  Select,
  Form,
  Input,
  Radio,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './index.less';
import { queryTopic } from './service';


const columns = [{
  title: '题目',
  dataIndex: 'title',
  key: 'title',
  width: "50%"
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

const { Option } = Select;


const UserAnalyse: React.FC = () => {

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
      <Row gutter={16}>
        <Col span="8" className="leftCard">
          <Card style={{ width: "100%", overflow: 'auto', height: "80vh" }}>
            <Table
              style={{ height: 500 }}
              columns={columns}
              dataSource={topicListData}
              pagination={pagination}
              loading={loading}
              onChange={handleTableChange}
              rowKey={record => record}
            />
          </Card>
        </Col>
        <Col span="16" className="rightCard">
          <Card style={{ width: "100%", overflow: 'auto', height: "80vh" }}>
          <FormSizeDemo />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};









type SizeType = Parameters<typeof Form>[0]['size'];

const FormSizeDemo = () => {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Input">
          <Input />
        </Form.Item>
        <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="TreeSelect">
          <TreeSelect
            treeData={[
              { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
            ]}
          />
        </Form.Item>
        <Form.Item label="Cascader">
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Switch">
          <Switch />
        </Form.Item>
        <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item>
      </Form>
    </>
  );
};



export default UserAnalyse;
