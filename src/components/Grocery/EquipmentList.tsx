import React, { useContext } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import { IItems, IItemsEquipment, IItem } from '@/types/PastryShop';
import { Button, List, Typography } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

interface IEquipmentListProps {
  addToCart: (item: IItem) => void;
}

function EquipmentList(props: IEquipmentListProps) {
  const { Items, isMobile, tabHeight }: { Items?: IItems; isMobile?: boolean; tabHeight?: number } = useContext(PastryShopContext);

  const { addToCart } = props;
  const equipmentList: IItemsEquipment[] = Items.equipment;

  return (
    <section style={{ display: 'flex', flexDirection: 'column', height: isMobile ? '300px' : tabHeight }}>
      <Typography.Title level={4}>Equipment</Typography.Title>
      <List
        size='small'
        dataSource={equipmentList}
        style={{ overflowY: 'auto' }}
        renderItem={(item: IItemsEquipment) => (
          <List.Item
            onClick={() => {
              addToCart(item);
            }}
          >
            <Typography.Text>{item.name}</Typography.Text>
            <Button style={{ border: 0, boxShadow: 'none' }}>
              <PlusCircleOutlined style={{ fontSize: '1.2rem', color: '#888888' }} />
            </Button>
          </List.Item>
        )}
      />
    </section>
  );
}

export default EquipmentList;
