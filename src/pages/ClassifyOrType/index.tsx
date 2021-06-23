import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, List, Input, Popconfirm, Select } from 'antd';
import  './index.less';
import { addType, queryType, queryClassify } from './service';
import type { typeListData } from './data.d';


const { Option } = Select;
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

const Tag: React.FC = () => {
  const [addTypeName, setaddTypeName] = useState<string>('');
  const [type, setType] = useState<typeListData>();
  const [classify, setclassify] = useState([]);
  const [classifySelect, setclassifySelect] = useState();
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  let queryTagParam = {};
  useEffect(() => {
    handleSearchType();
    // handleSearchClassify();
  }, []);

  const addTypeClick = () => {
    setConfirmLoading(true)
    let addParams = {
      name: addTypeName,
      classify_id: classifySelect,
    };
    addType(addParams).then((val) => {
      setaddTypeName('');
      setVisible(false);
      setConfirmLoading(false)
      queryType(queryTagParam).then((res) => {
        setType(res.data.rows);
      });
    });
  };

  const handleSearchType = () => {
    let param = {};
    queryType(param).then((res) => {
      setType(res.data.rows);
    });
  };


  const showPopconfirm = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const handleSearchClassify = () => {
    let param = {};
    queryClassify(param).then((res) => {
      setclassify(res.data.rows);
    });
  };

  const classifyOnselect = (value: any) => {
    setclassifySelect(value);
  };

  return (
    <PageContainer>
      <div >
        <Card style={{ width: '100%', marginBottom: 10 }}>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '300px' }}>
              <Select
                style={{ width: '80%' }}
                allowClear
                showSearch
                optionFilterProp="children"
                onChange={classifyOnselect}
                onDropdownVisibleChange={handleSearchClassify}
              >
                {renderOption(classify, 'id', 'name')}
              </Select>
            </div>
            <div style={{ width: '300px' }}>
              <Input
                disabled={classifySelect ? false : true}
                placeholder="请输入标签名"
                allowClear
                style={{ width: '80%' }}
                value={addTypeName}
                onChange={(e) => {
                  setaddTypeName(e.target.value);
                }}
              />
            </div>
            <div>
              <Popconfirm
                title="确定要新增该标签吗？"
                visible={visible}
                onConfirm={addTypeClick}
                okButtonProps={{ loading: confirmLoading }}
                onCancel={handleCancel}
              >
                <Button type="primary" style={{ float: 'right' }} onClick={showPopconfirm}>
                  新增
                </Button>
              </Popconfirm>
            </div>
          </div>
          <div style={{ marginTop: 10 }} className='search'>

          </div>
        </Card>

        <Card style={{ width: '100%' }}>
          <div style={{ margin: '10px 0', height: '70vh', overflow: 'auto', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0' }}>
            <List
              itemLayout="horizontal"
              dataSource={type}
              bordered
              renderItem={(item, index) => {
              // let svg = new DOMParser().parseFromString(item.classify.img_svg,"text/xml") 
              return (
                <List.Item style={{ display: 'flex'}}>
                  <div style={{ width: 150,display: 'flex',alignItems:'center'}}>
                    <img 
                      src={`data:image/svg+xml;base64,${window.btoa(item.classify.img_svg)}`} 
                      style={{height:35}}
                    />
                    <div style={{ marginLeft: 10 }}>{item.classify.name}</div>
                  </div>
                  <div
                    style={{
                      width: '50%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.name}
                  </div>
                  <div >
                    <Button type="primary">修改</Button>
                    <Button type="primary" danger style={{ marginLeft: 10 }}>
                      删除
                    </Button>
                  </div>
                </List.Item>
              )}}
            />
          </div>
        </Card>


      </div>
    </PageContainer>
  );
};

export default Tag;
