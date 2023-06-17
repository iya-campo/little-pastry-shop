import React, { useContext } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import { IStorage, IPastriesOnDisplay, IPlayer } from '@/types/PastryShop';
import DisplayStand from './DisplayStand';
import { Layout, Typography } from 'antd';
import styles from '../../styles/components/Bakery.module.scss';

function Bakery() {
  const {
    playerCash,
    playerRep,
    pastriesOnDisplay,
  }: {
    Player?: IPlayer;
    playerCash: number;
    playerRep: number;
    pastriesOnDisplay: IPastriesOnDisplay[];
  } = useContext(PastryShopContext);

  return (
    <Layout.Content style={{ display: 'flex', flexDirection: 'column' }}>
      <section style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography.Title level={2}>Bakery</Typography.Title>
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography.Text style={{ fontWeight: 600, marginRight: '4px' }}>Cash:</Typography.Text>
            <Typography.Text>{`$ ${playerCash ? playerCash : 0}`}</Typography.Text>
          </div>
          <div>
            <Typography.Text style={{ fontWeight: 600, marginRight: '4px' }}>Reputation: </Typography.Text>
            <Typography.Text>{playerRep ? playerRep : 0}</Typography.Text>
          </div>
        </div>
      </section>
      <section style={{ display: 'flex', flexWrap: 'wrap', flexGrow: 1 }}>
        {pastriesOnDisplay.map((pastry: IPastriesOnDisplay, index: number) => (
          <DisplayStand key={index} index={index} pastry={pastry} />
        ))}
      </section>
    </Layout.Content>
  );
}

export default Bakery;
