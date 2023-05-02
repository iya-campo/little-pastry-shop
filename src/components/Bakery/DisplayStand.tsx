import React, { useContext } from 'react';
import BakeryContext from '@/contexts/PastryShopContext';
import { IPastriesOnDisplay, IStorage } from '@/types/PastryShop';
import { Card, Select, SelectProps, Typography } from 'antd';
import { CloseSquareOutlined } from '@ant-design/icons';
import Image from 'next/image';
import styles from '../../styles/components/DisplayStand.module.scss';

interface DisplayStandProps {
  pastry?: IPastriesOnDisplay;
  index?: number;
}

function DisplayStand(props: DisplayStandProps) {
  const { Storage, isMobile }: { Storage?: IStorage; isMobile?: boolean } = useContext(BakeryContext);
  const { pastry, index } = props;

  const pastriesOnDisplay: SelectProps['options'] = [];

  Storage.pastriesOnDisplay.map((pastry: IPastriesOnDisplay, index: number) => {
    pastriesOnDisplay.push({
      label: pastry.name,
      value: index,
    });
  });

  return (
    <Card key={index} className={styles.displayStand} style={{ width: `${isMobile ? '100%' : '180px'}` }}>
      {pastry ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <CloseSquareOutlined style={{ fontSize: '1.2rem', cursor: 'pointer' }} onClick={() => alert('Removed!')} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
            <Image alt='pastry on display' height={64} width={64} src={`/icons/biscuits.png`}></Image>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography.Text style={{ fontWeight: 600 }}>{pastry.name.toUpperCase()}</Typography.Text>
            <div>
              <Typography.Text style={{ fontWeight: 600, marginRight: '8px' }}>Qty:</Typography.Text>
              <Typography.Text>{pastry.qty}</Typography.Text>
            </div>
          </div>
        </>
      ) : (
        <Select placeholder={'Select pastry'} options={pastriesOnDisplay} />
      )}
    </Card>
  );
}

export default DisplayStand;
