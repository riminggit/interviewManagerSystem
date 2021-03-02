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
import { queryKnowledge, queryTag, addKnowledge } from './service';
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';

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

const { Option } = Select;

const AddKnowledge: React.FC = () => {
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
      <Row gutter={16}>
        <Col span="8" className="leftCard">
          <Card style={{ width: '100%', overflow: 'auto', height: '100vh' }}>
            <Table
              style={{ height: 500 }}
              columns={columns}
              dataSource={KnowlageListData}
              pagination={pagination}
              loading={loading}
              onChange={handleTableChange}
              rowKey={(record: any) => record.id}
            />
          </Card>
        </Col>
        <Col span="16" className="rightCard">
          <Card style={{ width: '100%', overflow: 'auto' }}>
            <MyForm />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};
type SizeType = Parameters<typeof Form>[0]['size'];

const MyForm = () => {
  const [componentSize2, setcomponentSize2] = useState<SizeType | 'default'>('default');
  const [tag, setTag] = useState([]);
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null));

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setcomponentSize2(size);
  };

  const onSubmit = (values: any) => {
    values.content = values.content.toHTML();
    addKnowledge(values).then((res) => {
    });
  };

  const handleSearchTag = () => {
    let param = {};
    queryTag(param).then((res) => {
      setTag(res.data.rows);
    });
  };

  const handleChangeEditor = (editorState: any) => {
    setEditorState(editorState.toHTML());
    // console.log(editorState.toHTML(), "===")

    // 将editorState数据转换成RAW字符串(原始字符串)
    // const rawString = editorState.toRAW()
    // // editorState.toRAW()方法接收一个布尔值参数，用于决定是否返回RAW JSON对象，默认是false
    // const rawJSON = editorState.toRAW(true)
    // // 将editorState数据转换成html字符串
    // const htmlString = editorState.toHTML()
  };

  const renderOption = (arr: any[], code: string, name: string) =>
    arr
      ? arr.map((item, index) => {
          return (
            <Option key={index + item[code]} value={item[code]}>
              {item[name]}
            </Option>
          );
        })
      : null;

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize2 }}
        onValuesChange={onFormLayoutChange}
        size={componentSize2 as SizeType}
        onFinish={onSubmit}
      >
        <Form.Item label="标题" name="title">
          <Input />
        </Form.Item>

        <Form.Item label="选择标签" name="tag_id">
          <Select
            allowClear
            showSearch
            optionFilterProp="children"
            onDropdownVisibleChange={handleSearchTag}
          >
            {renderOption(tag, 'id', 'name')}
          </Select>
        </Form.Item>
        <Form.Item label="知识点内容" name="content">
          <BraftEditor
            value={editorState}
            onChange={handleChangeEditor}
            style={{ border: ' 1px solid #D3D3D3' }}
          />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" style={{ marginLeft: '9vw' }}>
            新增题目
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddKnowledge;
