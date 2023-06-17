import React, { Dispatch, SetStateAction, useContext } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import { IPlayer, IRecipes } from '@/types/PastryShop';
import { Avatar, List } from 'antd';
import styles from '@/styles/components/RecipeList.module.scss';

interface RecipeListProps {
  setPastryInfo: Dispatch<SetStateAction<IRecipes>>;
}

function RecipeList({ setPastryInfo }: RecipeListProps) {
  const {
    Recipes,
    Player,
    playerLevel,
    isMobile,
    tabHeight,
  }: { Recipes?: IRecipes[]; Player?: IPlayer; playerLevel: number; isMobile?: boolean; tabHeight?: number } = useContext(PastryShopContext);

  return (
    <section style={{ display: 'flex', flexDirection: 'column', height: isMobile ? '300px' : tabHeight }}>
      <List
        size='small'
        itemLayout='horizontal'
        dataSource={Recipes}
        className={styles.recipeList}
        renderItem={(recipe: IRecipes, index: number) => (
          <List.Item
            lockedtext={`Unlock at level ${recipe.levelRequirement}`}
            key={index}
            className={playerLevel >= recipe.levelRequirement ? styles.unlocked : styles.locked}
            onClick={() => {
              if (playerLevel >= recipe.levelRequirement) setPastryInfo(recipe);
            }}
          >
            <List.Item.Meta
              avatar={<Avatar src={`icons/recipes/${recipe.image}`} style={{ borderRadius: 0 }} />}
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
