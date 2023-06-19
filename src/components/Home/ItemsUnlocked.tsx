import React, { useContext } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import { IItems, IItemsEquipment, IRecipes, IUnlockedRecipes } from '@/types/PastryShop';
import { Divider, Typography } from 'antd';
import styles from '../../styles/components/ItemsUnlocked.module.scss';
import Image from 'next/image';

function ItemsUnlocked() {
  const {
    Recipes,
    Items,
    unlockedRecipes,
    unlockedEquipment,
  }: { Recipes: IRecipes[]; Items: IItems; unlockedRecipes: IUnlockedRecipes[]; unlockedEquipment: string[] } = useContext(PastryShopContext);
  return (
    <>
      <section style={{ marginBottom: '1rem' }}>
        <Divider plain orientation='left'>
          <Typography.Title level={5} style={{ fontWeight: 600, marginRight: '4px' }}>
            Pastries Baked
          </Typography.Title>
        </Divider>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {unlockedRecipes.map((unlockedRecipe: IUnlockedRecipes, index: number) => (
            <div key={index} className={styles.unlockedItems}>
              <Image
                alt={unlockedRecipe.name}
                height={40}
                width={40}
                src={`icons/recipes/${Recipes.find((recipe: IRecipes) => recipe.name === unlockedRecipe.name).image}`}
              ></Image>
              <Typography.Text strong>{unlockedRecipe.amountBaked}</Typography.Text>
            </div>
          ))}
        </div>
      </section>
      <section style={{ flexGrow: 1 }}>
        <Divider plain orientation='left'>
          <Typography.Title level={5} style={{ fontWeight: 600, marginRight: '4px' }}>
            Equipment Unlocked
          </Typography.Title>
        </Divider>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {unlockedEquipment.length !== 0 &&
            unlockedEquipment.map((unlockedEquipment: string, index: number) => (
              <div key={index} className={styles.unlockedItems}>
                <Image
                  alt={unlockedEquipment}
                  height={40}
                  width={40}
                  src={`icons/equipment/${Items.equipment.find((equipment: IItemsEquipment) => equipment.name === unlockedEquipment).image}`}
                ></Image>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

export default ItemsUnlocked;
