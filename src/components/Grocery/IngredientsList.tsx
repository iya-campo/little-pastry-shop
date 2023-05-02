import React, { useContext } from 'react';
import BakeryContext from '@/contexts/PastryShopContext';
import { IItems, IItemsIngredients, IItem } from '@/types/PastryShop';
import { Button, List, Typography } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

interface IIngredientsListProps {
  addToCart: (item: IItem) => void;
}

function IngredientsList(props: IIngredientsListProps) {
  const { Items, isMobile }: { Items?: IItems; isMobile?: boolean } = useContext(BakeryContext);

  const { addToCart } = props;
  const ingredientsList: IItemsIngredients[] = Items.ingredients;

  return (
    <section style={{ paddingRight: `${isMobile ? 0 : '2rem'}`, height: '100%' }}>
      <List
        size='small'
        header={<Typography.Title level={4}>Ingredients</Typography.Title>}
        dataSource={ingredientsList}
        renderItem={(item: IItemsIngredients) => (
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
        style={{ height: `${isMobile ? '250px' : '412px'}`, overflow: 'auto' }}
      />
    </section>
  );
}

export default IngredientsList;
