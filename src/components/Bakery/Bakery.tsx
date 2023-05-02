import React, { useContext } from 'react';
import BakeryContext from '@/contexts/PastryShopContext';
import { IStorage, IPastriesOnDisplay, IPlayer } from '@/types/PastryShop';
import DisplayStand from './DisplayStand';
import { Layout, Typography } from 'antd';
import styles from '../../styles/components/Bakery.module.scss';

function Bakery() {
  const { Player, Storage }: { Player?: IPlayer; Storage?: IStorage } = useContext(BakeryContext);

  return (
    <Layout.Content style={{ display: 'flex', flexDirection: 'column' }}>
      <section style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography.Title level={2}>Bakery</Typography.Title>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography.Text style={{ fontWeight: 600, marginRight: '8px' }}>Cash:</Typography.Text>
          <Typography.Text>{`$ ${Player?.cash ? Player.cash : 0} (+ ${'0'})`}</Typography.Text>
        </div>
      </section>
      <section style={{ display: 'flex', flexWrap: 'wrap', flexGrow: 1 }}>
        {Storage &&
          Storage?.pastriesOnDisplay.map((pastry: IPastriesOnDisplay, index: number) => <DisplayStand key={index} index={index} pastry={pastry} />)}
        {[...Array(4 - Storage?.pastriesOnDisplay.length).keys()].map((_, index: number) => (
          <DisplayStand key={index} />
        ))}
      </section>
    </Layout.Content>
  );
}

export default Bakery;
