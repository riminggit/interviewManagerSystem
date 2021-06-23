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
} from 'antd';
import './index.less';
import { queryTag, addKnowledge } from './service';
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';


const { Option } = Select;

const AddKnowledge: React.FC = () => {
  return (
    <PageContainer>
      <Card style={{ width: '100%', overflow: 'auto' }}>
        <div className='form-style'>
          <MyForm />
        </div>
  
      </Card>
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
          <Button type="primary" htmlType="submit" className='add-button'>
            新增题目
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddKnowledge;
