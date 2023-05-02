import React, { useContext, ReactElement } from 'react';
import BakeryContext from '@/contexts/PastryShopContext';
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
    Player,
    Recipes,
    Items,
    Storage,
    isMobile,
  }: { Player?: IPlayer; Recipes?: IRecipes[]; Items?: IItems; Storage?: IStorage; isMobile?: boolean } = useContext(BakeryContext);

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
      <Row style={{ flexGrow: 1 }}>
        <Col span={isMobile ? 24 : 16}>
          <Tabs
            style={{ height: '100%' }}
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
        <Col span={isMobile ? 24 : 8}>
          <ShoppingCart />
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default Grocery;
