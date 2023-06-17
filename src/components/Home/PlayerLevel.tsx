import React, { useContext, useState, useEffect } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import { IItems, IItemsEquipment, IPlayer, IRecipes } from '@/types/PastryShop';
import { Card, Divider, Typography } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';

function PlayerLevel() {
  const {
    Player,
    Recipes,
    Items,
    playerLevel,
    playerCurrentExp,
    playerExpToLevel,
  }: { Player?: IPlayer; Recipes?: IRecipes[]; Items?: IItems; playerLevel: number; playerCurrentExp: number; playerExpToLevel: number } =
    useContext(PastryShopContext);
  const [levelUpRewards, setLevelUpRewards] = useState<string[]>([]);
  const { equipment }: { equipment: IItemsEquipment[] } = Items;

  useEffect(() => {
    setLevelUpRewards([]);
    equipment.map((itemEquipment: IItemsEquipment) => {
      if (playerLevel + 1 === itemEquipment.levelRequirement) setLevelUpRewards((prevState: string[]) => [...prevState, itemEquipment.name]);
    });
    Recipes.map((recipe: IRecipes) => {
      if (playerLevel + 1 === recipe.levelRequirement) setLevelUpRewards((prevState: string[]) => [...prevState, `${recipe.name} Recipe`]);
    });
    (playerLevel + 1) % 10 === 0 ? setLevelUpRewards((prevState: string[]) => [...prevState, '+1 Display Slot']) : '';
  }, [playerLevel]);

  return (
    <>
      <Card style={{ width: '100%' }}>
        <Typography.Title level={5}>{`${Player.name}, Day ${Player.daysPlayed}`}</Typography.Title>
        <div>
          <Typography.Text style={{ fontWeight: 600, marginRight: '4px' }}>Level: </Typography.Text>
          <Typography.Text>{playerLevel}</Typography.Text>
        </div>
        <div>
          <Typography.Text style={{ fontWeight: 600, marginRight: '4px' }}>Exp: </Typography.Text>
          <Typography.Text>{`${playerCurrentExp} / ${playerExpToLevel}`}</Typography.Text>
          {playerLevel < 25 && <DoubleRightOutlined style={{ margin: '0 8px', color: '#888888' }} />}
          <Typography.Text>{playerLevel < 25 ? playerLevel + 1 : ''}</Typography.Text>
        </div>
      </Card>
      <Divider plain>
        <Typography.Title level={5} style={{ margin: 0 }}>
          Level {playerLevel + 1} Rewards
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
