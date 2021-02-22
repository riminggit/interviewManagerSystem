import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, List, Typography } from 'antd';
import styles from './index.less';
import { queryTag, addTag } from './service';
import type { tagListData } from './data.d';


const UserAnalyse: React.FC = () => {
  const [tagListData, querytagListData] = useState<tagListData>();
  const [tagListDataCount, setTagListDataCount] = useState<number>(0);
  // const tagListData = useRef<tagListData>(null);
  // const tagListDataCount = useRef<number>(0);
  let queryTagParam = {}
  useEffect(() => {

    queryTag(queryTagParam).then((res) => {
      if (res.code === 200) {
        querytagListData(res.data.rows)
        setTagListDataCount(res.data.count)
      }

    })
  }, [queryTagParam]);


  return (
    <PageContainer>
      {tagListData ? <List
        itemLayout="horizontal"
        dataSource={tagListData}
        bordered
        renderItem={item => (
          <List.Item>
            <span>{item.id}</span>
            <span>{item.name}</span>
          </List.Item>
        )}
      /> : null},
    </PageContainer>
  );
};

export default UserAnalyse;
