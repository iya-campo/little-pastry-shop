import React, { Dispatch, SetStateAction, useContext } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import { Button, InputNumber, List, Typography } from 'antd';
import styles from '@/styles/components/ShoppingCart.module.scss';

function ShoppingCart() {
  const {
    isMobile,
    tabHeight,
  }: {
    isMobile?: boolean;
    tabHeight?: number;
  } = useContext(PastryShopContext);

  return (
    <section style={{ display: 'flex', flexDirection: 'column', height: isMobile ? '300px' : tabHeight }}>
      <Typography.Title level={4}>Shopping Cart</Typography.Title>
      <List
        size='small'
        style={{ marginBottom: '1rem', overflowY: 'auto' }}
        dataSource={[
          'Apple',
          'Apple',
          'Apple',
          'Apple',
          'Apple',
          'Apple',
          'Apple',
          'Apple',
          'Apple',
          'Apple',
          'Apple',
          'Apple',
          'Apple',
          'Apple',
          'Apple',
          'Apple',
          'Apple',
          'Apple',
          'Apple',
          'Apple',
          'Apple',
          'Apple',
          'Apple',
          'Apple',
        ]}
        renderItem={(item) => (
          <List.Item onClick={() => {}}>
            <Typography.Text>{item}</Typography.Text>
            <InputNumber min={1} max={10} defaultValue={3} onChange={() => {}} style={{ width: '60px' }} />
          </List.Item>
        )}
      />
      <Button style={{ width: '100%' }}>Purchase</Button>
    </section>
  );
}

export default ShoppingCart;
