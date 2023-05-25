import React, { Dispatch, SetStateAction, useContext } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import { IRecipes } from '@/types/PastryShop';
import { Avatar, List } from 'antd';

interface RecipeListProps {
  setPastryInfo: Dispatch<SetStateAction<IRecipes>>;
}

function RecipeList(props: RecipeListProps) {
  const { Recipes, isMobile, tabHeight }: { Recipes?: IRecipes[]; isMobile?: boolean; tabHeight?: number } = useContext(PastryShopContext);
  const { setPastryInfo } = props;

  return (
    <section style={{ display: 'flex', flexDirection: 'column', height: isMobile ? '300px' : tabHeight }}>
      <List
        size='small'
        itemLayout='horizontal'
        dataSource={Recipes}
        style={{ overflowY: 'auto' }}
        renderItem={(recipe: IRecipes, index: number) => (
          <List.Item
            key={index}
            onClick={() => {
              setPastryInfo(recipe);
            }}
            style={{ cursor: 'pointer' }}
          >
            <List.Item.Meta
              avatar={<Avatar src={`icons/${recipe.image}`} style={{ borderRadius: 0 }} />}
              title={recipe.name}
              description='Ant Design, a design language for background applications.'
            />
          </List.Item>
        )}
      />
    </section>
  );
}

export default RecipeList;
