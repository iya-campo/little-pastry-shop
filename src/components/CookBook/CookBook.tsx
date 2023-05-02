import React, { useState, useContext } from 'react';
import BakeryContext from '@/contexts/PastryShopContext';
import { IRecipes } from '@/types/PastryShop';
import RecipeList from './RecipeList';
import RecipeInfo from './RecipeInfo';
import Kitchen from './Kitchen';
import { Button, Col, Layout, Row, Typography } from 'antd';
import styles from '@/styles/components/CookBook.module.scss';

function CookBook() {
  const { isMobile }: { isMobile?: boolean } = useContext(BakeryContext);
  const [pastryInfo, setPastryInfo] = useState<IRecipes>();

  return (
    <Layout.Content style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography.Title level={2}>Cook Book</Typography.Title>
      <Row gutter={[16, 16]} style={{ display: 'flex', flexGrow: 1 }}>
        <Col span={isMobile ? 24 : 10}>
          <RecipeList setPastryInfo={setPastryInfo} />
        </Col>
        <Col span={isMobile ? 24 : 14}>
          <RecipeInfo pastryInfo={pastryInfo} />
          <Kitchen />
          <Row style={{ height: `${isMobile ? 'auto' : '10%'}` }}>
            <Button style={{ height: '100%', width: '100%' }}>Bake!</Button>
          </Row>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default CookBook;
