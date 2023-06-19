import React, { useState, useEffect, useContext, Dispatch, SetStateAction } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import { IRecipes, IIngredients, IEquipmentSlot } from '@/types/PastryShop';
import { Row, Col, Select, SelectProps, Typography } from 'antd';
import styles from '@/styles/components/Kitchen.module.scss';

interface IKitchenProps {
  pastryInfo: IRecipes;
  setIsBakeable: Dispatch<SetStateAction<boolean>>;
  selectedIngredients: string[];
  setSelectedIngredients: Dispatch<SetStateAction<string[]>>;
  selectedEquipment: string[];
  setSelectedEquipment: Dispatch<SetStateAction<string[]>>;
}

function Kitchen({ pastryInfo, setIsBakeable, selectedIngredients, setSelectedIngredients, selectedEquipment, setSelectedEquipment }: IKitchenProps) {
  const { storageIngredients, unlockedEquipment, isMobile }: { storageIngredients: IIngredients[]; unlockedEquipment: string[]; isMobile: boolean } =
    useContext(PastryShopContext);

  const ingredients: SelectProps['options'] = [];
  const equipment: SelectProps['options'] = [];

  const emptyEquipmentSlots = [
    {
      name: 'Empty',
      order: 0,
    },
    {
      name: 'Empty',
      order: 1,
    },
    {
      name: 'Empty',
      order: 2,
    },
  ];
  const [equipmentSlots, setEquipmentSlots] = useState<IEquipmentSlot[]>(emptyEquipmentSlots);

  for (const ingredient of storageIngredients) {
    ingredients.push({
      label: `${ingredient?.name} (${ingredient?.qty})`,
      value: ingredient?.name,
    });
  }

  for (const unlockedEquip of unlockedEquipment) {
    equipment.push({
      label: unlockedEquip,
      value: unlockedEquip,
      disabled: selectedEquipment?.includes(unlockedEquip),
    });
  }

  useEffect(() => {
    checkRecipe();
  }, [pastryInfo, selectedIngredients, selectedEquipment]);

  useEffect(() => {
    clearKitchen();
  }, [pastryInfo]);

  const checkRecipe = () => {
    if (!pastryInfo) return;

    let matchedEquipment: boolean, matchedIngredients: boolean;

    const recipeEquipment = pastryInfo.equipment.map((equipment: string) => equipment);
    recipeEquipment.sort();
    selectedEquipment.sort();
    matchedEquipment =
      selectedEquipment.length !== 0 && selectedEquipment.every((equipment: string, index: number) => equipment === recipeEquipment[index]);

    const recipeIngredients = pastryInfo.ingredients.map((ingredients: IIngredients) => ingredients.name);
    recipeIngredients.sort();
    selectedIngredients.sort();
    matchedIngredients =
      selectedIngredients.length !== 0 && selectedIngredients.every((ingredient: string, index: number) => ingredient === recipeIngredients[index]);

    setIsBakeable(matchedEquipment && matchedIngredients);
  };

  const clearKitchen = () => {
    setSelectedIngredients([]);
    setSelectedEquipment([]);
    setEquipmentSlots(emptyEquipmentSlots);
  };

  const handleIngredientChange = (ingredients: string[]) => {
    setSelectedIngredients([...ingredients]);
  };

  const handleEquipmentChange = (equipment: string, order: number) => {
    if (!selectedEquipment.includes(equipment) && equipment !== undefined) {
      setSelectedEquipment((prevState: string[]) => [...prevState, equipment]);
    }
    equipmentSlots[order].name = equipment;
    equipmentSlots[order].order = order;
  };

  return (
    <Row gutter={[16, 16]} style={{ height: isMobile ? 'auto' : '60%', padding: '1rem 0' }}>
      <Col span={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography.Title level={5}>Equipment</Typography.Title>
        <section style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%' }}>
          {equipmentSlots.map((equipmentSlot: IEquipmentSlot, index: number) => (
            <Select
              key={index}
              className={styles.equipmentSlot}
              allowClear
              onClear={() => {
                setSelectedEquipment(selectedEquipment.filter((equipment: string) => equipment !== equipmentSlot.name));
              }}
              onChange={(value: string) => handleEquipmentChange(value, index)}
              placeholder={`Equipment ${index + 1}`}
              options={equipment}
              value={equipmentSlot.name !== 'Empty' ? equipmentSlot.name : undefined}
            />
          ))}
        </section>
      </Col>
      <Col span={16} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography.Title level={5}>Ingredients</Typography.Title>
        <section style={{ width: '100%' }}>
          <Select
            mode='multiple'
            className={styles.ingredientsSelect}
            allowClear
            onChange={handleIngredientChange}
            placeholder='Select ingredients to use'
            options={ingredients}
            value={selectedIngredients}
            defaultValue={[]}
          />
        </section>
      </Col>
    </Row>
  );
}

export default Kitchen;
