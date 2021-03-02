import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, List, Input, Popconfirm, Select } from 'antd';
import styles from './index.less';
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

  let queryTagParam = {};
  useEffect(() => {
    handleSearchType();
    // handleSearchClassify();
  }, []);

  const addTypeClick = () => {
    let addParams = {
      name: addTypeName,
      classify_id: classifySelect,
    };
    addType(addParams).then((val) => {
      setaddTypeName('');
      setVisible(false);
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

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
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
      <div className={styles.cardContent}>
        <Card style={{ width: 800, height: '100vh', overflow: 'auto' }}>
          <List
            itemLayout="horizontal"
            dataSource={type}
            bordered
            renderItem={(item) => (
              <List.Item>
                <div style={{ display: 'inline-block', width: 150 }}>
                  <span>{item.id}</span>
                  {/* <span dangerouslySetInnerHTML={{ __html: item.classify.img_svg }}></span> */}
                  <span style={{ marginLeft: 10 }}>{item.classify.name}</span>
                </div>
                <span
                  style={{
                    width: '50%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.name}
                </span>
                <div style={{ display: 'inline-block' }}>
                  <Button type="primary">修改</Button>
                  <Button type="primary" danger style={{ marginLeft: 10 }}>
                    删除
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </Card>

        <Card style={{ width: 500, marginLeft: 20 }}>
          <div className={styles.addTag}>
            <div style={{ width: '100%' }}>
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
            <div style={{ marginTop: 10 }}>
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
        </Card>
      </div>
    </PageContainer>
  );
};

export default Tag;
