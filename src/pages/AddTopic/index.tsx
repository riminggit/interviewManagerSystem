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
import { queryTopic, queryClassify, queryCompany, queryKnowledge, queryTag, queryType, addTopic } from './service';
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'


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


const AddTopic: React.FC = () => {

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
          <Card style={{ width: "100%", overflow: 'auto', height: "100vh" }}>
            <Table
              style={{ height: 500 }}
              columns={columns}
              dataSource={topicListData}
              pagination={pagination}
              loading={loading}
              onChange={handleTableChange}
              rowKey={(record: any) => record.id}
            />
          </Card>
        </Col>
        <Col span="16" className="rightCard">
          <Card style={{ width: "100%", overflow: 'auto' }}>
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
  const [classify, setclassify] = useState([]);
  const [company, setCompany] = useState([]);
  const [knowledge, setKnowledge] = useState([]);
  const [tag, setTag] = useState([]);
  const [type, setType] = useState([]);
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null));
  const [classifySelect, setclassifySelect] = useState([]);



  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const onSubmit = (values: any) => {
    values.analysis = values.analysis.toHTML()
    addTopic(values).then(res => {
      console.log(res,"dsdsd")
    })
  };

  const handleSearchClassify = () => {
    let param = {};
    queryClassify(param).then(res => {
      setclassify(res.data.rows)
    })
  };

  const handleSearchCompany = () => {
    let param = {};
    queryCompany(param).then(res => {
      setCompany(res.data.rows)
    })
  };

  const handleSearchTag = () => {
    let param = {};
    queryTag(param).then(res => {
      setTag(res.data.rows)
    })
  };

  const handleSearchKnowledge = () => {
    let param = {};
    queryKnowledge(param).then(res => {
      setKnowledge(res.data.rows)
    })
  };

  const handleSearchType = () => {
    let param = {
      classify_id:classifySelect
    };
    queryType(param).then(res => {
      setType(res.data.rows)
    })
  };

  const handleChangeEditor = (editorState: any) => {
    setEditorState(editorState.toHTML())
    // console.log(editorState.toHTML(), "===")

    // 将editorState数据转换成RAW字符串(原始字符串)
    // const rawString = editorState.toRAW()
    // // editorState.toRAW()方法接收一个布尔值参数，用于决定是否返回RAW JSON对象，默认是false
    // const rawJSON = editorState.toRAW(true)
    // // 将editorState数据转换成html字符串
    // const htmlString = editorState.toHTML()
  }

  const renderOption = (arr: any[], code: string, name: string) => arr ? arr.map((item, index) => {
    return (<Option key={index + item[code]} value={item[code]}>{item[name]}</Option>)
  }) : null



  const classifyOnselect = (value: any) => {
    setclassifySelect(value)
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
        onFinish={onSubmit}
      >
        <Form.Item label="标题" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="难度" name="degree">
          <Radio.Group>
            <Radio.Button value='0'>简单</Radio.Button>
            <Radio.Button value='1'>中等</Radio.Button>
            <Radio.Button value='2'>难</Radio.Button>
            <Radio.Button value='3'>极难</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="等级" name="level">
          <Radio.Group>
            <Radio.Button value='1'>初级</Radio.Button>
            <Radio.Button value='2'>中级</Radio.Button>
            <Radio.Button value='3'>高级</Radio.Button>
            <Radio.Button value='4'>资深</Radio.Button>
            <Radio.Button value='5'>专家</Radio.Button>
            <Radio.Button value='6'>资深专家</Radio.Button>
            <Radio.Button value='7'>研究员</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="是否基础题" name="is_base_topic">
          <Radio.Group>
            <Radio.Button value='0'>否</Radio.Button>
            <Radio.Button value='1'>是</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="是否重点题" name="is_important_topic">
          <Radio.Group>
            <Radio.Button value='0'>否</Radio.Button>
            <Radio.Button value='1'>是</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="选择分类" name="classify_id">
          <Select
            allowClear
            showSearch
            mode="multiple"
            optionFilterProp="children"
            onChange={classifyOnselect}
            onDropdownVisibleChange={handleSearchClassify}
          >
            {renderOption(classify, 'id', 'name')}
          </Select>
        </Form.Item>
        <Form.Item label="选择二级分类" name="type_id">
          <Select
            disabled={classifySelect.length!==0?false:true}
            allowClear
            showSearch
            mode="multiple"
            optionFilterProp="children"
            onDropdownVisibleChange={handleSearchType}
          >
            {renderOption(type, 'id', 'name')}
          </Select>
        </Form.Item>
        <Form.Item label="选择公司" name="company_id">
          <Select
            allowClear
            showSearch
            mode="multiple"
            optionFilterProp="children"
            onDropdownVisibleChange={handleSearchCompany}
          >
            {renderOption(company, 'id', 'company_name')}
          </Select>
        </Form.Item>
        <Form.Item label="选择知识点" name="knowledge_id">
          <Select
            allowClear
            showSearch
            mode="multiple"
            optionFilterProp="children"
            onDropdownVisibleChange={handleSearchKnowledge}
          >
            {renderOption(knowledge, 'id', 'title')}
          </Select>
        </Form.Item>
        <Form.Item label="选择标签" name="tag_id">
          <Select
            allowClear
            showSearch
            mode="multiple"
            optionFilterProp="children"
            onDropdownVisibleChange={handleSearchTag}
          >
            {renderOption(tag, 'id', 'name')}
          </Select>
        </Form.Item>
        <Form.Item label="题解" name="analysis">
          <BraftEditor
            value={editorState}
            onChange={handleChangeEditor}
            style={{ border: ' 1px solid #D3D3D3' }}
          />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" style={{ marginLeft: "9vw" }}>
            新增题目
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};


export default AddTopic;
