import React, { useContext } from 'react';
import BakeryContext from '@/contexts/PastryShopContext';
import { IIngredients, IPlayer, IStorage } from '@/types/PastryShop';
import { Row, Col, Select, SelectProps, Typography } from 'antd';
import styles from '@/styles/components/Kitchen.module.scss';

function Kitchen() {
  const { Player, Storage, isMobile }: { Player?: IPlayer; Storage?: IStorage; isMobile?: boolean } = useContext(BakeryContext);
  const ingredients: SelectProps['options'] = [];
  const equipment: SelectProps['options'] = [];

  Storage.ingredients.map((ingredient: IIngredients) => {
    ingredients.push({
      label: ingredient.name,
      value: ingredient.name,
    });
  });

  Player.unlockedEquipment.map((unlockedEquipment: string) => {
    equipment.push({
      label: unlockedEquipment,
      value: unlockedEquipment,
    });
  });

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  return (
    <Row gutter={[16, 16]} style={{ height: `${isMobile ? 'auto' : '60%'}`, padding: '1rem 0' }}>
      <Col span={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography.Title level={5}>Equipment</Typography.Title>
        <section style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%' }}>
          {[...Array(3).keys()].map((index: number) => (
            <Select key={index} className={styles.equipmentSlot} onChange={handleChange} options={equipment} placeholder={`Equipment ${index + 1}`} />
          ))}
        </section>
      </Col>
      <Col span={16} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography.Title level={5}>Ingredients</Typography.Title>
        <section style={{ width: '100%' }}>
          <Select
            mode='multiple'
            allowClear
            style={{ width: '100%' }}
            placeholder='Select ingredients to use'
            defaultValue={[]}
            onChange={handleChange}
            options={ingredients}
            className={styles.ingredientsSelect}
          />
        </section>
      </Col>
    </Row>
  );
}

export default Kitchen;
