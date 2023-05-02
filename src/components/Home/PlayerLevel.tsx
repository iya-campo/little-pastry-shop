import React, { useContext, useState, useEffect } from 'react';
import BakeryContext from '@/contexts/PastryShopContext';
import { IItems, IItemsEquipment, IPlayer, IRecipes } from '@/types/PastryShop';
import { Card, Divider, Typography } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';

function PlayerLevel() {
  const { Player, Recipes, Items, isMobile }: { Player?: IPlayer; Recipes?: IRecipes[]; Items?: IItems; isMobile?: boolean } =
    useContext(BakeryContext);
  const [levelUpRewards, setLevelUpRewards] = useState<string[]>([]);
  const { equipment }: { equipment: IItemsEquipment[] } = Items;

  useEffect(() => {
    setLevelUpRewards([]);
    equipment.map((itemEquipment: IItemsEquipment) => {
      if (Player.level + 1 === itemEquipment.levelRequirement) setLevelUpRewards((prevState: string[]) => [...prevState, itemEquipment.name]);
    });
    Recipes.map((recipe: IRecipes) => {
      if (Player.level + 1 === recipe.levelRequirement) setLevelUpRewards((prevState: string[]) => [...prevState, recipe.name]);
    });
    (Player.level + 1) % 5 === 0 ? setLevelUpRewards((prevState: string[]) => [...prevState, '+1 Display Slot']) : '';
  }, [Player.level]);

  return (
    <>
      <Card style={{ width: '100%' }}>
        <div>
          <Typography.Text style={{ fontWeight: 600, marginRight: '4px' }}>Level: </Typography.Text>
          <Typography.Text>{Player.level}</Typography.Text>
        </div>
        <div>
          <Typography.Text style={{ fontWeight: 600, marginRight: '4px' }}>Exp: </Typography.Text>
          <Typography.Text>{`${Player.currentExp} / ${Player.expToLevel}`}</Typography.Text>
          <DoubleRightOutlined style={{ margin: '0 8px', color: '#888888' }} />
          <Typography.Text>{Player.level + 1}</Typography.Text>
        </div>
      </Card>
      <Divider plain>
        <Typography.Title level={5} style={{ margin: 0 }}>
          Level {Player.level + 1} Rewards
        </Typography.Title>
      </Divider>
      <section style={{ textAlign: 'center', width: '100%' }}>
        {levelUpRewards.length > 0 ? (
          levelUpRewards.map((reward: string, index: number) => <Typography.Paragraph key={index}>{reward}</Typography.Paragraph>)
        ) : (
          <Typography.Paragraph>No rewards available.</Typography.Paragraph>
        )}
      </section>
    </>
  );
}

export default PlayerLevel;
