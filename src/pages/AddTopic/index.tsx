import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Card,
  Row,
  Col,
  Button,
  Table,
  Select,
  Form,
  Input,
  Radio,
  message
} from 'antd';
import './index.less';
import { queryClassify, queryCompany, queryKnowledge, queryTag, queryType, addTopic } from './service';
import type {
  ISelectAnalysis
} from './data.d';
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';


const { Option } = Select;

const AddTopic: React.FC = () => {

  return (
    <PageContainer>
      <Card style={{ width: "100%", overflow: 'auto' }}>
        <div className='form-style'>
          <FormSizeDemo />
        </div>
      </Card>
    </PageContainer>
  );
};


type SizeType = Parameters<typeof Form>[0]['size'];

let selectAnalysisDefault = [{ validity: false, content: '' }, { validity: false, content: '' }, { validity: false, content: '' }]

const FormSizeDemo = () => {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
  const [classify, setclassify] = useState([]);
  const [company, setCompany] = useState([]);
  const [knowledge, setKnowledge] = useState([]);
  const [tag, setTag] = useState([]);
  const [type, setType] = useState([]);
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null));
  const [classifySelect, setclassifySelect] = useState([]);
  const [questionType, setQuestionType] = useState<number>(1);
  const [selectAnalysis, setSelectAnalysis] = useState<ISelectAnalysis[]>(selectAnalysisDefault);

  const [form] = Form.useForm();

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const onSubmit = (values: any) => {
    questionType !== 1 ? values.analysis = values.analysis.toHTML() : null
    questionType !== 2 ? values.select_analysis = selectAnalysis : null
    values.question_type = questionType
    addTopic(values).then(res => {
      // form.setFieldsValue({});
      message.success(res.data.msg, 10);
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
      classify_id: classifySelect
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
    return (<Option key={index + item[name]} value={item[code]}>{item[name]}</Option>)
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
        <Form.Item label="题目类型" >
          <Radio.Group
            value={questionType}
            onChange={(e) => {
              setQuestionType(e.target.value)
            }}
          >
            <Radio.Button value={1}>选择题</Radio.Button>
            <Radio.Button value={2}>解析题</Radio.Button>
            <Radio.Button value={3}>选择/解析题</Radio.Button>
          </Radio.Group>
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
            disabled={classifySelect.length !== 0 ? false : true}
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
        {
          questionType !== 2 ? <Form.Item label="选择题题解">
            {
              selectAnalysis.map((item, index) => {
                return <div key={`${selectAnalysis[index].content}${index}`} style={{ marginTop: 8 }}>
                  <Radio.Group
                    value={selectAnalysis[index].validity}
                    onChange={(e) => {
                      let help = [...selectAnalysis]
                      help[index].validity = e.target.value
                      setSelectAnalysis(help)
                    }}
                  >
                    <Radio.Button value={true}>对</Radio.Button>
                    <Radio.Button value={false}>错</Radio.Button>
                  </Radio.Group>
                  <Input
                    value={selectAnalysis[index].content}
                    onChange={(e) => {
                      let help = [...selectAnalysis]
                      help[index].content = e.target.value
                      setSelectAnalysis(help)
                    }}
                    style={{ marginLeft: 12, width: 350 }}
                  />
                  {
                    selectAnalysis.length - 1 === index ? <span style={{ marginLeft: 12 }}>
                      <Button
                        type='primary'
                        shape='circle'
                        icon={<PlusOutlined />}
                        onClick={() => {
                          let help = [...selectAnalysis]
                          help.push({ validity: false, content: '' })
                          setSelectAnalysis(help)
                        }}
                      />
                      <Button
                        style={{ marginLeft: 8 }}
                        shape='circle'
                        icon={<MinusOutlined />}
                        onClick={() => {
                          let help = [...selectAnalysis]
                          help.splice(index, 1)
                          setSelectAnalysis(help)
                        }}
                      />
                    </span> : null
                  }
                </div>
              })
            }
          </Form.Item> : null
        }
        {
          questionType !== 1 ? <Form.Item label="题解" name="analysis">
            <BraftEditor
              value={editorState}
              onChange={handleChangeEditor}
              style={{ border: ' 1px solid #D3D3D3' }}
            />
          </Form.Item> : null
        }

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" className='add-button'>
            新增题目
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};


export default AddTopic;
