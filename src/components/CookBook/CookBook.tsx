import React, { useState, useContext, Dispatch, SetStateAction, useEffect, useRef } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import { IBakedGoods, IIngredients, IPastriesOnDisplay, IRecipes, IUnlockedRecipes } from '@/types/PastryShop';
import RecipeList from './RecipeList';
import RecipeInfo from './RecipeInfo';
import Kitchen from './Kitchen';
import BakeButton from './BakeButton';
import { Layout, Row, Col, Typography } from 'antd';
import { determineQuality, determineSuccess } from '@/utils/Utils';
import { INIT_MASTERY } from '@/utils/Constants';

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

  useEffect(() => {
    clearConsumedIngredients();
  }, [storageIngredients]);

  const bakePastry = () => {
    const recipe: IUnlockedRecipes = unlockedRecipes.find((recipe: IUnlockedRecipes) => recipe.name === pastryInfo.name);
    const mastery: number = recipe?.mastery ? recipe?.mastery : INIT_MASTERY;
    const isSuccess = true; // determineSuccess(mastery);

    if (isSuccess) {
      unlockPastry();
      storePastry(mastery);
      if (recipe) {
        gainMastery(recipe);
        addBakeCount();
      }
    } else {
      console.log(`Failed to bake a ${pastryInfo.name}...`);
    }
    gainExp();
    consumeIngredients();
  };

  const unlockPastry = () => {
    const unlockedRecipe: IUnlockedRecipes = unlockedRecipes.find((unlockedRecipe: IUnlockedRecipes) => unlockedRecipe.name === pastryInfo.name);
    if (!unlockedRecipe) {
      setUnlockedRecipes((prevState: IUnlockedRecipes[]) => [
        ...prevState,
        {
          name: pastryInfo.name,
          mastery: INIT_MASTERY,
          amountBaked: 1,
        },
      ]);
    }
  };

  const storePastry = (recipeMastery: number) => {
    const existingBakedGood: IBakedGoods = bakedGoods.find(
      (bakedGood: IBakedGoods) => bakedGood.name === pastryInfo.name && bakedGood.quality === determineQuality(recipeMastery)
    );

    if (!existingBakedGood) {
      setBakedGoods((prevState: IBakedGoods[]) => {
        const updatedBakedGoods: IBakedGoods[] = [
          ...prevState,
          {
            name: pastryInfo.name,
            qty: 1,
            price: pastryInfo.price,
            quality: determineQuality(recipeMastery),
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
                qty: bakedGood.qty + 1,
              }
            : bakedGood
        )
      );
    }

    updatePastryDisplay(recipeMastery);
  };

  const updatePastryDisplay = (recipeMastery: number) => {
    const existingPastriesOnDisplay: IPastriesOnDisplay = pastriesOnDisplay.find(
      (pastriesOnDisplay: IPastriesOnDisplay) =>
        pastriesOnDisplay.name === pastryInfo.name && pastriesOnDisplay.quality === determineQuality(recipeMastery)
    );

    if (existingPastriesOnDisplay) {
      setPastriesOnDisplay(
        pastriesOnDisplay.map((pastryOnDisplay: IPastriesOnDisplay) =>
          pastryOnDisplay.name === existingPastriesOnDisplay.name && pastryOnDisplay.quality === existingPastriesOnDisplay.quality
            ? {
                ...pastryOnDisplay,
                qty: pastryOnDisplay.qty + 1,
              }
            : pastryOnDisplay
        )
      );
    }
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
    recipe.mastery += masteryGained;
    console.log(`${pastryInfo.name} mastery: ${recipe.mastery} (${determineQuality(recipe.mastery)})`);
  };

  const gainExp = () => {
    let expGained: number = 0;
    expGained += pastryInfo.price;
    setPlayerCurrentExp((prevState: number) => prevState + expGained);
    console.log(`You gained ${expGained} exp for baking.`);
  };

  const addBakeCount = () => {
    setUnlockedRecipes(
      unlockedRecipes.map((unlockedRecipe: IUnlockedRecipes) =>
        unlockedRecipe.name === pastryInfo.name
          ? {
              ...unlockedRecipe,
              amountBaked: unlockedRecipe.amountBaked + 1,
            }
          : unlockedRecipe
      )
    );
  };

  const consumeIngredients = () => {
    const recipeIngredients: string[] = pastryInfo.ingredients.map((recipeIngredient: IIngredients) => recipeIngredient.name);

    storageIngredients.map((storageIngredient: IIngredients) => {
      if (recipeIngredients.includes(storageIngredient.name) && storageIngredient.qty > 1) {
        setStorageIngredients((prevState: IIngredients[]) =>
          prevState.map((consumedIngredient: IIngredients) =>
            consumedIngredient.name === storageIngredient.name
              ? {
                  ...consumedIngredient,
                  qty: consumedIngredient.qty - 1,
                }
              : consumedIngredient
          )
        );
      }
      if (recipeIngredients.includes(storageIngredient.name) && storageIngredient.qty === 1) {
        setStorageIngredients((prevState: IIngredients[]) =>
          prevState.filter((consumedIngredient: IIngredients) => consumedIngredient.name !== storageIngredient.name)
        );
      }
    });
  };

  const clearConsumedIngredients = () => {
    let remainingSelected: string[] = [];
    storageIngredients.map((storageIngredient: IIngredients) => {
      if (selectedIngredients.includes(storageIngredient.name)) remainingSelected = [...remainingSelected, storageIngredient.name];
    });
    setSelectedIngredients(remainingSelected.sort());
    console.log('Stored Ingredients:', storageIngredients);
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
