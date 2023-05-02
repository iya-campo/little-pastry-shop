import React, { useState, useContext, Dispatch, SetStateAction, useEffect, useRef } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import { IRecipes } from '@/types/PastryShop';
import RecipeList from './RecipeList';
import RecipeInfo from './RecipeInfo';
import Kitchen from './Kitchen';
import BakeButton from './BakeButton';
import { Layout, Row, Col, Typography } from 'antd';
import styles from '@/styles/components/CookBook.module.scss';

function CookBook() {
  const { isMobile, setTabHeight }: { isMobile?: boolean; setTabHeight?: Dispatch<SetStateAction<number>> } = useContext(PastryShopContext);
  const [pastryInfo, setPastryInfo] = useState<IRecipes>();
  const heightRef = useRef(null);

  useEffect(() => {
    setTabHeight(heightRef.current?.clientHeight);
  }, []);

  return (
    <Layout.Content style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography.Title level={2}>Cook Book</Typography.Title>
      <Row style={{ display: 'flex', flexGrow: 1 }} ref={heightRef}>
        <Col span={isMobile ? 24 : 10} style={{ padding: isMobile ? '1rem 0 1rem 0' : '0 2rem 0 0' }}>
          <RecipeList setPastryInfo={setPastryInfo} />
        </Col>
        <Col span={isMobile ? 24 : 14}>
          <RecipeInfo pastryInfo={pastryInfo} />
          <Kitchen />
          <BakeButton />
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default CookBook;
