import React, { useContext } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import { IItems, IItemsIngredients, IItemsEquipment } from '@/types/PastryShop';
import { Button, List, Typography } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

interface IIngredientsListProps {
  addToCart: (item: IItemsIngredients | IItemsEquipment) => void;
}

function IngredientsList({ addToCart }: IIngredientsListProps) {
  const { Items, isMobile, tabHeight }: { Items: IItems; isMobile: boolean; tabHeight: number } = useContext(PastryShopContext);

  const ingredientsList: IItemsIngredients[] = Items.ingredients;

  return (
    <section style={{ display: 'flex', flexDirection: 'column', height: isMobile ? '300px' : tabHeight }}>
      <Typography.Title level={4}>Ingredients</Typography.Title>
      <List
        size='small'
        dataSource={ingredientsList}
        style={{ overflowY: 'auto' }}
        renderItem={(item: IItemsIngredients) => (
          <List.Item>
            {!isMobile ? (
              <Typography.Text>{`${item.name} - $ ${item.price}`}</Typography.Text>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography.Text>{`${item.name}`}</Typography.Text>
                <Typography.Text>{`$ ${item.price}`}</Typography.Text>
              </div>
            )}

            <Button style={{ border: 0, boxShadow: 'none', cursor: 'default' }}>
              <PlusCircleOutlined
                style={{ fontSize: '1.2rem', color: '#888888' }}
                onClick={() => {
                  addToCart(item);
                }}
              />
            </Button>
          </List.Item>
        )}
      />
    </section>
  );
}

export default IngredientsList;
