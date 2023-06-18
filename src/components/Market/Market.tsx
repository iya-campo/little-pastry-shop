import React, { useContext, ReactElement, useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import { IItemsIngredients, IItemsEquipment, ICartItem } from '@/types/PastryShop';
import IngredientsList from './IngredientsList';
import EquipmentList from './EquipmentList';
import ShoppingCart from './ShoppingCart';
import { Layout, Row, Col, Tabs, Typography } from 'antd';
import styles from '@/styles/components/Market.module.scss';

interface ITabDetails {
  label: string;
  children: ReactElement;
}

function Market() {
  const {
    playerCash,
    isMobile,
    setTabHeight,
  }: {
    playerCash: number;
    isMobile: boolean;
    setTabHeight: Dispatch<SetStateAction<number>>;
  } = useContext(PastryShopContext);

  const heightRef = useRef(null);

  const [cart, setCart] = useState<ICartItem[]>([]);

  useEffect(() => {
    setTabHeight(heightRef.current?.clientHeight);
  }, []);

  const addToCart = (item: IItemsIngredients | IItemsEquipment): void => {
    const itemFound = cart.find((cartItem: ICartItem) => cartItem.name === item.name);
    let addedItem: ICartItem;
    if (!itemFound) {
      addedItem = {
        name: item.name,
        qty: 1,
        price: item.price,
        category: item.category,
      };
      setCart((prevState: ICartItem[]) => [...prevState, addedItem]);
      console.log(`Added ${addedItem.name}(s) to cart!`);
    } else {
      if (item.category === 'Equipment') return;
      itemFound.qty += 1;
      setCart((prevState: ICartItem[]) => [...prevState]);
      console.log(`Added ${itemFound.name}(s) to cart!`);
    }
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
      <section style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography.Title level={2}>Market</Typography.Title>
        <div>
          <Typography.Text style={{ fontWeight: 600, marginRight: '4px' }}>Cash:</Typography.Text>
          <Typography.Text>{`$ ${playerCash ? playerCash : 0}`}</Typography.Text>
        </div>
      </section>
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
          <ShoppingCart cart={cart} setCart={setCart} />
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default Market;
