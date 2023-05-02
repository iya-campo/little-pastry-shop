import React, { useContext } from 'react';
import BakeryContext from '@/contexts/PastryShopContext';
import { Button, InputNumber, List, Typography } from 'antd';
import styles from '@/styles/components/ShoppingCart.module.scss';

function ShoppingCart() {
  const { isMobile }: { isMobile?: boolean } = useContext(BakeryContext);

  return (
    <section style={{ display: 'flex', flexDirection: 'column', height: '100%', marginTop: `${isMobile ? '2rem' : 0}` }}>
      <List
        size='small'
        header={<Typography.Title level={4}>Shopping Cart</Typography.Title>}
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
        style={{ height: `${isMobile ? '250px' : '365px'}`, marginBottom: '1rem', overflow: 'auto' }}
        className={styles.shoppingCartList}
      />
      <Button style={{ width: '100%' }}>Purchase</Button>
    </section>
  );
}

export default ShoppingCart;
