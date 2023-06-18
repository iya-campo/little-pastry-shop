import React, { useState, useContext, Dispatch, SetStateAction, useEffect, useRef } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import { IBakedGoods, IIngredients, IPastriesOnDisplay, IRecipes, IUnlockedRecipes } from '@/types/PastryShop';
import RecipeList from './RecipeList';
import RecipeInfo from './RecipeInfo';
import Kitchen from './Kitchen';
import BakeButton from './BakeButton';
import { determineQuality, determineSuccess } from '@/utils/Utils';
import { Layout, Row, Col, Typography } from 'antd';

function CookBook() {
  const {
    setPlayerCurrentExp,
    bakedGoods,
    setBakedGoods,
    pastriesOnDisplay,
    setPastriesOnDisplay,
    storageIngredients,
    setStorageIngredients,
    unlockedRecipes,
    setUnlockedRecipes,
    setTabHeight,
    isMobile,
  }: {
    setPlayerCurrentExp: Dispatch<SetStateAction<number>>;
    bakedGoods: IBakedGoods[];
    setBakedGoods: Dispatch<SetStateAction<IBakedGoods[]>>;
    pastriesOnDisplay: IPastriesOnDisplay[];
    setPastriesOnDisplay: Dispatch<SetStateAction<IPastriesOnDisplay[]>>;
    storageIngredients: IIngredients[];
    setStorageIngredients: Dispatch<SetStateAction<IIngredients[]>>;
    unlockedRecipes: IUnlockedRecipes[];
    setUnlockedRecipes: Dispatch<SetStateAction<IUnlockedRecipes[]>>;
    setTabHeight: Dispatch<SetStateAction<number>>;
    isMobile: boolean;
  } = useContext(PastryShopContext);
  const [pastryInfo, setPastryInfo] = useState<IRecipes>();
  const [isBakeable, setIsBakeable] = useState<boolean>(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const heightRef = useRef(null);

  useEffect(() => {
    setTabHeight(heightRef.current?.clientHeight);
  }, []);

  const bakePastry = () => {
    const recipe: IUnlockedRecipes = unlockedRecipes.find((recipe: IUnlockedRecipes) => recipe.name === pastryInfo.name);

    const existingBakedGood: IBakedGoods = bakedGoods.find(
      (bakedGood: IBakedGoods) => bakedGood.name === pastryInfo.name && bakedGood.quality === determineQuality(recipe.mastery)
    );
    const existingPastriesOnDisplay: IPastriesOnDisplay = pastriesOnDisplay.find(
      (pastriesOnDisplay: IPastriesOnDisplay) =>
        pastriesOnDisplay.name === pastryInfo.name && pastriesOnDisplay.quality === determineQuality(recipe.mastery)
    );

    // if (determineSuccess(recipe.mastery)) {
    if (true) {
      if (!existingBakedGood) {
        setBakedGoods((prevState: IBakedGoods[]) => {
          const updatedBakedGoods: IBakedGoods[] = [
            ...prevState,
            {
              name: pastryInfo.name,
              qty: 1,
              price: pastryInfo.price,
              quality: determineQuality(recipe.mastery),
            },
          ];
          return updatedBakedGoods;
        });
      } else {
        setBakedGoods(
          bakedGoods.map((bakedGood: IBakedGoods) =>
            bakedGood.name === existingBakedGood.name && bakedGood.quality === existingBakedGood.quality
              ? {
                  ...bakedGood,
                  qty: (bakedGood.qty += 1),
                }
              : bakedGood
          )
        );
      }

      if (existingPastriesOnDisplay) {
        setPastriesOnDisplay(
          pastriesOnDisplay.map((pastryOnDisplay: IPastriesOnDisplay) =>
            pastryOnDisplay.name === existingPastriesOnDisplay.name && pastryOnDisplay.quality === existingPastriesOnDisplay.quality
              ? {
                  ...pastryOnDisplay,
                  qty: (pastryOnDisplay.qty += 1),
                }
              : pastryOnDisplay
          )
        );
      }

      gainMastery(recipe);
      addBakeCount(recipe);
    } else {
      console.log(`Failed to bake a ${pastryInfo.name}...`);
    }
    consumeIngredients();
    gainExp();
  };

  const gainMastery = (recipe: IUnlockedRecipes) => {
    let masteryGained: number = 0;
    switch (determineQuality(recipe.mastery)) {
      case 'Poor':
        masteryGained = 4;
        break;
      case 'Decent':
        masteryGained = 3;
        break;
      case 'Good':
        masteryGained = 2;
        break;
      case 'Great':
        masteryGained = 1;
        break;
      case 'Excellent':
        masteryGained = 0;
        break;
      default:
        console.log('Invalid quality.');
    }
    setUnlockedRecipes(
      unlockedRecipes.map((unlockedRecipe: IUnlockedRecipes) =>
        unlockedRecipe.name === recipe.name
          ? {
              ...unlockedRecipe,
              mastery: unlockedRecipe.mastery + 4,
            }
          : unlockedRecipe
      )
    );
    console.log(`${pastryInfo.name} mastery: ${recipe.mastery} (${determineQuality(recipe.mastery)})`);
  };

  const addBakeCount = (recipe: IUnlockedRecipes) => {
    setUnlockedRecipes(
      unlockedRecipes.map((unlockedRecipe: IUnlockedRecipes) =>
        unlockedRecipe.name === recipe.name
          ? {
              ...unlockedRecipe,
              amountBaked: unlockedRecipe.amountBaked + 1,
            }
          : unlockedRecipe
      )
    );
  };

  const consumeIngredients = () => {
    let remainingIngredients: IIngredients[];
    storageIngredients.map((storedIngredient: IIngredients) => {
      pastryInfo.ingredients.map((recipeIngredient: IIngredients) => {
        if (recipeIngredient.name === storedIngredient.name && storedIngredient.qty === 1) {
          remainingIngredients = storageIngredients.filter((storedIngredient: IIngredients) => recipeIngredient.name !== storedIngredient.name);
          setStorageIngredients(remainingIngredients);
        }
        if (recipeIngredient.name === storedIngredient.name && storedIngredient.qty > 1) {
          setStorageIngredients((prevState: IIngredients[]) => [...prevState]);
          storedIngredient.qty -= 1;
        }
      });
    });

    clearConsumedIngredients();
    console.log('Stored Ingredients:', storageIngredients);
  };

  const gainExp = () => {
    let expGained: number = 0;
    expGained += pastryInfo.price;
    setPlayerCurrentExp((prevState: number) => prevState + expGained);
    console.log(`You gained ${expGained} exp for baking.`);
  };

  const clearConsumedIngredients = () => {
    let remainingSelected: string[] = [];
    storageIngredients.map((storageIngredient: IIngredients) => {
      if (selectedIngredients.includes(storageIngredient.name)) remainingSelected = [...remainingSelected, storageIngredient.name];
    });
    setSelectedIngredients(remainingSelected);
  };

  return (
    <Layout.Content style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography.Title level={2}>Cook Book</Typography.Title>
      <Row style={{ display: 'flex', flexGrow: 1 }} ref={heightRef}>
        <Col span={isMobile ? 24 : 10} style={{ padding: isMobile ? '1rem 0 1rem 0' : '0 2rem 0 0' }}>
          <RecipeList setPastryInfo={setPastryInfo} />
        </Col>
        <Col span={isMobile ? 24 : 14}>
          <RecipeInfo pastryInfo={pastryInfo} />
          <Kitchen
            pastryInfo={pastryInfo}
            setIsBakeable={setIsBakeable}
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
            selectedEquipment={selectedEquipment}
            setSelectedEquipment={setSelectedEquipment}
          />
          <BakeButton bakePastry={bakePastry} isBakeable={isBakeable} />
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default CookBook;
