import React, { useState, useContext, Dispatch, SetStateAction, useEffect, useRef } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import { IBakedGoods, IIngredients, IPastriesOnDisplay, IPlayer, IRecipes, IStorage, IUnlockedRecipes } from '@/types/PastryShop';
import RecipeList from './RecipeList';
import RecipeInfo from './RecipeInfo';
import Kitchen from './Kitchen';
import BakeButton from './BakeButton';
import { determineQuality, determineSuccess } from '@/utils/Utils';
import { Layout, Row, Col, Typography } from 'antd';
import styles from '@/styles/components/CookBook.module.scss';

function CookBook() {
  const {
    Player,
    Storage,
    setPlayerCurrentExp,
    setStorageIngredients,
    setBakedGoods,
    setPastriesOnDisplay,
    isMobile,
    setTabHeight,
  }: {
    Player?: IPlayer;
    Storage?: IStorage;
    setPlayerCurrentExp: Dispatch<SetStateAction<number>>;
    setStorageIngredients: Dispatch<SetStateAction<IIngredients[]>>;
    setBakedGoods: Dispatch<SetStateAction<IBakedGoods[]>>;
    setPastriesOnDisplay: Dispatch<SetStateAction<IPastriesOnDisplay[]>>;
    isMobile?: boolean;
    setTabHeight?: Dispatch<SetStateAction<number>>;
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
    const recipe: IUnlockedRecipes = Player.unlockedRecipes.find((recipe: IUnlockedRecipes) => recipe.name === pastryInfo.name);

    const existingBakedGood: IBakedGoods = Storage.bakedGoods.find(
      (bakedGood: IBakedGoods) => bakedGood.name === pastryInfo.name && bakedGood.quality === determineQuality(recipe.mastery)
    );
    const existingPastriesOnDisplay: IPastriesOnDisplay = Storage.pastriesOnDisplay.find(
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
          Storage.bakedGoods = updatedBakedGoods;
          return updatedBakedGoods;
        });
      } else {
        setBakedGoods((prevState: IBakedGoods[]) => {
          existingBakedGood.qty += 1;
          return [...prevState];
        });
      }

      if (existingPastriesOnDisplay) {
        setPastriesOnDisplay((prevState: IPastriesOnDisplay[]) => {
          existingPastriesOnDisplay.qty += 1;
          return [...prevState];
        });
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
    const masteryRecipe: IUnlockedRecipes = recipe;
    let masteryGained: number = 0;
    switch (determineQuality(masteryRecipe.mastery)) {
      case 'Poor':
        masteryGained += 4;
        break;
      case 'Decent':
        masteryGained += 3;
        break;
      case 'Good':
        masteryGained += 2;
        break;
      case 'Great':
        masteryGained += 1;
        break;
      case 'Excellent':
        masteryGained += 0;
        break;
      default:
        console.log('Invalid quality.');
    }
    masteryRecipe.mastery += masteryGained;
    console.log(`${pastryInfo.name} mastery: ${masteryRecipe.mastery} (${determineQuality(masteryRecipe.mastery)})`);
  };

  const addBakeCount = (recipe: IUnlockedRecipes) => {
    const bakedRecipe: IUnlockedRecipes = recipe;
    bakedRecipe.amountBaked += 1;
  };

  const consumeIngredients = () => {
    let remainingIngredients: IIngredients[];
    Storage.ingredients.map((storedIngredient: IIngredients) => {
      pastryInfo.ingredients.map((recipeIngredient: IIngredients) => {
        if (recipeIngredient.name === storedIngredient.name && storedIngredient.qty === 1) {
          remainingIngredients = Storage.ingredients.filter((storedIngredient: IIngredients) => recipeIngredient.name !== storedIngredient.name);
          setStorageIngredients(remainingIngredients);
          Storage.ingredients = remainingIngredients;
        }
        if (recipeIngredient.name === storedIngredient.name && storedIngredient.qty > 1) {
          setStorageIngredients((prevState: IIngredients[]) => [...prevState]);
          storedIngredient.qty -= 1;
        }
      });
    });

    clearConsumedIngredients();
    console.log('Stored Ingredients:', Storage.ingredients);
  };

  const gainExp = () => {
    let expGained: number = 0;
    expGained += pastryInfo.price;
    setPlayerCurrentExp((prevState: number) => prevState + expGained);
    console.log(`You gained ${expGained} exp for baking.`);
  };

  const clearConsumedIngredients = () => {
    let remainingSelected: string[] = [];
    Storage.ingredients.map((storageIngredient: IIngredients) => {
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
