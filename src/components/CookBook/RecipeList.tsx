import React, { useContext } from 'react';
import BakeryContext from '@/contexts/PastryShopContext';
import { IRecipes } from '@/types/PastryShop';
import { Avatar, List } from 'antd';

interface RecipeListProps {
  setPastryInfo: React.Dispatch<React.SetStateAction<IRecipes>>;
}

function RecipeList(props: RecipeListProps) {
  const { Recipes, isMobile }: { Recipes?: IRecipes[]; isMobile?: boolean } = useContext(BakeryContext);
  const { setPastryInfo } = props;

  return (
    <List
      style={{ height: `${isMobile ? '200px' : '412px'}`, overflow: 'auto' }}
      size='small'
      itemLayout='horizontal'
      dataSource={Recipes}
      renderItem={(recipe: IRecipes, index: number) => (
        <List.Item
          key={index}
          onClick={() => {
            setPastryInfo(recipe);
          }}
          style={{ cursor: 'pointer' }}
        >
          <List.Item.Meta
            avatar={<Avatar src={`icons/${recipe.name}.png`} style={{ borderRadius: 0 }} />}
            title={recipe.name}
            description='Ant Design, a design language for background applications.'
          />
        </List.Item>
      )}
    />
  );
}

export default RecipeList;
