import React, { useContext, ReactElement, useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import { IPlayer, IRecipes, IItems, IStorage, IItem } from '@/types/PastryShop';
import IngredientsList from './IngredientsList';
import EquipmentList from './EquipmentList';
import ShoppingCart from './ShoppingCart';
import { Layout, Row, Col, Tabs, Typography } from 'antd';
import styles from '@/styles/components/Grocery.module.scss';

interface ITabDetails {
  label: string;
  children: ReactElement;
}

function Grocery() {
  const {
    isMobile,
    setTabHeight,
  }: {
    isMobile?: boolean;
    setTabHeight?: Dispatch<SetStateAction<number>>;
  } = useContext(PastryShopContext);
  const heightRef = useRef(null);

  useEffect(() => {
    setTabHeight(heightRef.current?.clientHeight);
  }, []);

  const addToCart = (item: IItem): void => {
    console.log(`Added ${item.name}(s) to cart!`);
  };

  const removeFromCart = (item: IItem): void => {
    console.log(`Removed ${item.name}(s) to cart!`);
  };

  const tabDetails: ITabDetails[] = [
    {
      label: 'Ingredients',
      children: <IngredientsList addToCart={addToCart} />,
    },
    {
      label: 'Equipment',
      children: <EquipmentList addToCart={addToCart} />,
    },
  ];

  return (
    <Layout.Content style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography.Title level={2}>Grocery</Typography.Title>
      <Row style={{ flexGrow: 1, overflow: 'hidden' }} ref={heightRef}>
        <Col span={isMobile ? 24 : 16} style={{ marginTop: isMobile ? '1rem' : 0 }}>
          <Tabs
            style={{ height: '100%', paddingRight: isMobile ? 0 : '2rem' }}
            className={styles.listTabs}
            tabPosition='left'
            items={new Array(2).fill(null).map((_, index: number) => {
              const id = String(index);
              return {
                label: tabDetails[index].label,
                key: id,
                children: tabDetails[index].children,
              };
            })}
          />
        </Col>
        <Col span={isMobile ? 24 : 8} style={{ marginTop: isMobile ? '1rem' : 0 }}>
          <ShoppingCart />
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default Grocery;
