import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, List, Input, Popconfirm, Select } from 'antd';
import './index.less';
import { queryTag, addTag, } from './service';
import type { tagListData, } from './data.d';


const Tag: React.FC = () => {
  const [tagListData, querytagListData] = useState<tagListData>();
  const [tagListDataCount, setTagListDataCount] = useState<number>(0);
  const [addTagName, setAddTagName] = useState<string>('');



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
    setVisible(false);
  };

  return (
    <PageContainer>
      <div >
        <Card style={{ width: '100%', marginBottom: 10 }}>
          <div>
            <Input
              placeholder="请输入标签名"
              allowClear
              style={{ width: 350 }}
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
              <Button type="primary" style={{ marginLeft: 15 }} onClick={showPopconfirm}>
                新增
            </Button>
            </Popconfirm>
          </div>
        </Card>
        <Card style={{ width: '100%', }}>
          <div style={{ margin: '10px 0', height: '80vh', overflow: 'auto', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0' }}>
            <List
              itemLayout="horizontal"
              dataSource={tagListData}
              bordered
              renderItem={(item) => (
                <List.Item style={{ display: 'flex' }}>
                  {/* <div>{item.id}</div> */}
                  <div >{item.name}</div>
                  {/* <div style={{ width: 150 }}>
                  <Button type="primary" style={{ marginRight: 10 }}>
                    修改
                  </Button>
                    <Button type="primary" danger >
                      删除
                  </Button>
                </div> */}
                </List.Item>
              )}
            />
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Tag;
