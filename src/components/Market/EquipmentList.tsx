import React, { useContext } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import { IItems, IItemsIngredients, IItemsEquipment } from '@/types/PastryShop';
import { Button, List, Typography } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import styles from '@/styles/components/EquipmentList.module.scss';

interface IEquipmentListProps {
  addToCart: (item: IItemsIngredients | IItemsEquipment) => void;
}

function EquipmentList({ addToCart }: IEquipmentListProps) {
  const {
    Items,
    playerLevel,
    unlockedEquipment,
    isMobile,
    tabHeight,
  }: { Items: IItems; playerLevel: number; unlockedEquipment: string[]; isMobile: boolean; tabHeight: number } = useContext(PastryShopContext);

  const equipmentList: IItemsEquipment[] = Items.equipment;

  const checkEquipmentRequirement = (item: IItemsEquipment) => {
    if (playerLevel < item.levelRequirement) return true;
  };

  const checkIfEquipmentOwned = (item: IItemsEquipment) => {
    if (unlockedEquipment.includes(item.name)) return true;
  };

  return (
    <section style={{ display: 'flex', flexDirection: 'column', height: isMobile ? '300px' : tabHeight }}>
      <Typography.Title level={4}>Equipment</Typography.Title>
      <List
        size='small'
        dataSource={equipmentList}
        style={{ overflowY: 'auto' }}
        renderItem={(item: IItemsEquipment) => (
          <List.Item>
            <Typography.Text>{`${item.name} - $ ${item.price}`}</Typography.Text>
            <Button className={styles.equipmentListBtn}>
              {checkEquipmentRequirement(item) && `Lvl. ${item.levelRequirement}`}
              {checkIfEquipmentOwned(item) && `Equipment Owned`}
              <PlusCircleOutlined
                className={`${styles.equipmentListIcon} ${checkEquipmentRequirement(item) || checkIfEquipmentOwned(item) ? styles.disabled : ''}`}
                onClick={() => {
                  if (!(checkEquipmentRequirement(item) || checkIfEquipmentOwned(item))) addToCart(item);
                }}
              />
            </Button>
          </List.Item>
        )}
      />
    </section>
  );
}

export default EquipmentList;
