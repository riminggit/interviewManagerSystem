import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, List,  Input,  Popconfirm } from 'antd';
import styles from './index.less';
import { queryTag, addTag } from './service';
import type { tagListData } from './data.d';

const UserAnalyse: React.FC = () => {
  const [tagListData, querytagListData] = useState<tagListData>();
  const [tagListDataCount, setTagListDataCount] = useState<number>(0);
  const [addTagName, setAddTagName] = useState<string>('');
  // const tagListData = useRef<tagListData>(null);
  // const tagListDataCount = useRef<number>(0);
  let queryTagParam = {};
  useEffect(() => {
    queryTag(queryTagParam).then((res) => {
      if (res.code === 200) {
        querytagListData(res.data.rows);
        setTagListDataCount(res.data.count);
      }
    });
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
          querytagListData(res.data.rows);
          setTagListDataCount(res.data.count);
        }
      });
    });
  };

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const showPopconfirm = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <PageContainer>
      <div className={styles.cardContent}>
        <Card style={{ width: 500, height: '100vh',overflow: 'auto'}}>
          <List
           
            itemLayout="horizontal"
            dataSource={tagListData}
            bordered
            renderItem={(item) => (
              <List.Item>
                <span>{item.id}</span>
                <span style={{ width: 190 }}>{item.name}</span>
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
        </Card>
      </div>
    </PageContainer>
  );
};

export default UserAnalyse;
