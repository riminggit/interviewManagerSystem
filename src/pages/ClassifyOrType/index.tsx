import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, List, Input, Popconfirm, Select } from 'antd';
import styles from './index.less';
import { queryTag, addTag, queryType } from './service';
import type {  typeListData } from './data.d';

const { Option } = Select;
const renderOption = (arr: any[], code: string, name: string) => arr ? arr.map((item, index) => {
  return (<Option key={index + item[code]} value={item[code]}>{item[name]}</Option>)
}) : null


const Tag: React.FC = () => {
  const [addTagName, setAddTagName] = useState<string>('');
  const [type, setType] = useState<typeListData>();
  let queryTagParam = {};
  useEffect(() => {

    handleSearchType();
  }, []);

  const addTagClick = () => {
    let addParams = {
      name: addTagName,
    };
    addTag(addParams).then((val) => {
      setAddTagName('');
      setVisible(false);
      queryTag(queryTagParam).then((res) => {
        if (res.code === 200) {

        }
      });
    });
  };

  const handleSearchType = () => {
    let param = {};
    queryType(param).then(res => {
      setType(res.data.rows)
    })
  };


  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const showPopconfirm = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <PageContainer>
      <div className={styles.cardContent}>
        <Card style={{ width: 500, height: '100vh', overflow: 'auto' }}>
          <List
            itemLayout="horizontal"
            dataSource={type}
            bordered
            renderItem={(item) => (
              <List.Item>
                <span>{item.id}</span>
                <span style={{ width: 190, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>
                <Button type="primary" style={{ float: 'right' }}>
                  修改
                </Button>
                <Button type="primary" danger style={{ float: 'right' }}>
                  删除
                </Button>
              </List.Item>
            )}
          />
        </Card>

        <Card style={{ width: 500, marginLeft: 20 }}>
          <div className={styles.addTag}>
            <Input
              placeholder="请输入标签名"
              allowClear
              style={{ width: '80%' }}
              value={addTagName}
              onChange={(e) => {
                setAddTagName(e.target.value);
              }}
            />
            <Popconfirm
              title="确定要新增该标签吗？"
              visible={visible}
              onConfirm={addTagClick}
              okButtonProps={{ loading: confirmLoading }}
              onCancel={handleCancel}
            >
              <Button type="primary" style={{ float: 'right' }} onClick={showPopconfirm}>
                新增
            </Button>
            </Popconfirm>
          </div>

        </Card>
      </div>
    </PageContainer>
  );
};

export default Tag;
