import React, { useContext, SetStateAction, Dispatch, MouseEvent } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import { IRecipes, IBakedGoods, IPastriesOnDisplay } from '@/types/PastryShop';
import { Button, Card, Select, SelectProps, Typography } from 'antd';
import { CloseSquareOutlined } from '@ant-design/icons';
import Image from 'next/image';
import styles from '../../styles/components/DisplayStand.module.scss';

interface IDisplayStandProps {
  index?: number;
  pastry?: IPastriesOnDisplay;
}

function DisplayStand({ index, pastry }: IDisplayStandProps) {
  const {
    Recipes,
    bakedGoods,
    playerCash,
    setPlayerCash,
    pastriesOnDisplay,
    setPastriesOnDisplay,
    isMobile,
  }: {
    Recipes: IRecipes[];
    bakedGoods: IBakedGoods[];
    playerCash: number;
    setPlayerCash: Dispatch<SetStateAction<number>>;
    pastriesOnDisplay: IPastriesOnDisplay[];
    setPastriesOnDisplay: Dispatch<SetStateAction<IPastriesOnDisplay[]>>;
    isMobile?: boolean;
  } = useContext(PastryShopContext);

  const pastries: SelectProps['options'] = [];

  for (const bakedGood of bakedGoods) {
    pastries.push({
      label: `${bakedGood?.name} (${bakedGood?.quality})`,
      value: `${bakedGood?.name} (${bakedGood?.quality})`,
      disabled:
        pastriesOnDisplay &&
        pastriesOnDisplay.find(
          (pastryOnDisplay: IPastriesOnDisplay) => pastryOnDisplay?.name === bakedGood?.name && pastryOnDisplay?.quality === bakedGood?.quality
        )
          ? true
          : false,
    });
  }

  const displayPastry = (pastryToDisplay: string, order: number) => {
    const bakedGoodFound: IBakedGoods = bakedGoods.find(
      (bakedGood: IBakedGoods) =>
        bakedGood.name === pastryToDisplay.split(' ')[0] && bakedGood.quality === pastryToDisplay.split(' ')[1].replace(/[()]/g, '')
    );

    setDisplaySlot('Add', bakedGoodFound, order);
  };

  const removePastry = (e: MouseEvent<HTMLSpanElement>) => {
    const pastryToRemove = e.currentTarget.getAttribute('value');
    const bakedGoodRemoved: IPastriesOnDisplay = pastriesOnDisplay.find(
      (pastryOnDisplay: IPastriesOnDisplay) => `${pastryOnDisplay.name} (${pastryOnDisplay.quality})` === pastryToRemove
    );

    setDisplaySlot('Remove', bakedGoodRemoved, bakedGoodRemoved.order);
  };

  const setDisplaySlot = (action: 'Add' | 'Remove', pastry: IBakedGoods | IPastriesOnDisplay, order: number) => {
    setPastriesOnDisplay(
      pastriesOnDisplay.map((pastryOnDisplay: IPastriesOnDisplay) =>
        pastryOnDisplay.order === order
          ? {
              name: action === 'Add' ? pastry.name : 'Empty',
              qty: action === 'Add' ? pastry.qty : 0,
              price: action === 'Add' ? pastry.price : 0,
              quality: action === 'Add' ? pastry.quality : 'N/A',
              order: order,
            }
          : pastryOnDisplay
      )
    );
  };

  const purchaseDisplaySlot = (order: number, price: number) => {
    if (playerCash >= price) {
      setPlayerCash((prevState: number) => prevState - price);
      setPastriesOnDisplay(
        pastriesOnDisplay.map((pastryOnDisplay: IPastriesOnDisplay) =>
          pastryOnDisplay.order === order
            ? {
                ...pastryOnDisplay,
                name: 'Empty',
              }
            : pastryOnDisplay
        )
      );
    }
  };

  const findPastryImg = (pastry: string) => {
    return Recipes.find((recipe: IRecipes) => recipe.name === pastry).image;
  };

  return (
    <Card key={index} className={styles.displayStand} style={{ width: isMobile ? '100%' : '180px' }}>
      {pastry ? (
        pastry.name !== 'Empty' && pastry.name !== 'Locked' && pastry.name !== 'Unlocked' ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <CloseSquareOutlined
                style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                onClick={(e: MouseEvent<HTMLSpanElement>) => removePastry(e)}
                value={`${pastry.name} (${pastry.quality})`}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, marginBottom: '1rem' }}>
              <Image alt='pastry on display' height={64} width={64} src={`/icons/recipes/${findPastryImg(pastry.name)}`}></Image>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography.Text style={{ fontWeight: 600 }}>{pastry.name.toUpperCase()}</Typography.Text>
              <Typography.Text style={{ fontWeight: 600 }}>({pastry.quality})</Typography.Text>
              <div>
                <Typography.Text style={{ fontWeight: 600, marginRight: '8px' }}>Qty:</Typography.Text>
                <Typography.Text>{pastry.qty}</Typography.Text>
              </div>
            </div>
          </>
        ) : pastry.name === 'Empty' ? (
          <Select placeholder={'Select pastry'} options={pastries} onChange={(value) => displayPastry(value, index)} allowClear />
        ) : pastry.name === 'Locked' || pastry.name === 'Unlocked' ? (
          <div style={{ textAlign: 'center' }}>
            {pastry.name === 'Locked' && <Typography.Text>{`Unlock at level ${(index - 1) * 10}`}</Typography.Text>}
            {pastry.name === 'Unlocked' && (
              <Button
                onClick={() => purchaseDisplaySlot(pastry.order, (index - 1) * 100)}
                style={{ whiteSpace: 'normal', height: 'fit-content' }}
              >{`Purchase extra slot for $ ${(index - 1) * 100}`}</Button>
            )}
          </div>
        ) : (
          'Invalid slot name.'
        )
      ) : (
        'Missing pastry.'
      )}
    </Card>
  );
}

export default DisplayStand;
