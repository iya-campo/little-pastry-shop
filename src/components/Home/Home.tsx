import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import {
  IBakedGoods,
  IEndDayModal,
  IItems,
  IItemsEquipment,
  IPastriesOnDisplay,
  IPlayer,
  IRecipes,
  IStorage,
  IUnlockedRecipes,
} from '@/types/PastryShop';
import PlayerLevel from './PlayerLevel';
import { determineSuccess, randomAmount } from '@/utils/Utils';
import { Layout, Row, Col, Divider, Button, Typography } from 'antd';
import styles from '@/styles/components/Home.module.scss';
import EndDay from './EndDay';
import Image from 'next/image';

function Home() {
  const {
    Player,
    Recipes,
    Items,
    Storage,
    playerLevel,
    setPlayerLevel,
    playerCurrentExp,
    setPlayerCurrentExp,
    playerExpToLevel,
    setPlayerExpToLevel,
    playerCash,
    setPlayerCash,
    playerRep,
    setPlayerRep,
    setBakedGoods,
    setPastriesOnDisplay,
    unlockedEquipment,
    isMobile,
  }: {
    Player?: IPlayer;
    Recipes?: IRecipes[];
    Items?: IItems;
    Storage?: IStorage;
    playerLevel: number;
    setPlayerLevel: Dispatch<SetStateAction<number>>;
    playerCurrentExp: number;
    setPlayerCurrentExp: Dispatch<SetStateAction<number>>;
    playerExpToLevel: number;
    setPlayerExpToLevel: Dispatch<SetStateAction<number>>;
    playerCash: number;
    setPlayerCash: Dispatch<SetStateAction<number>>;
    playerRep: number;
    setPlayerRep: Dispatch<SetStateAction<number>>;
    unlockedEquipment: string[];
    setBakedGoods: Dispatch<SetStateAction<IBakedGoods[]>>;
    setPastriesOnDisplay: Dispatch<SetStateAction<IPastriesOnDisplay[]>>;
    isMobile?: boolean;
  } = useContext(PastryShopContext);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<IEndDayModal>({ pastriesSold: [], cashEarned: 0, repEarned: 0 });
  const [totalExpGained, setTotalExpGained] = useState<number>(0);

  useEffect(() => {
    levelUp();
  }, [playerCurrentExp]);

  useEffect(() => {
    unlockDisplaySlot();
  }, [playerLevel]);

  const endDay = () => {
    sellGoods();
    setIsModalOpen(true);
    Player.daysPlayed += 1;
  };

  const sellGoods = () => {
    Storage.pastriesOnDisplay.map((pastry: IPastriesOnDisplay) => {
      // chance for pastries to be sold when day is ended
      // increased chance with higher reputation
      // if (determineSuccess(playerRep / 100) && pastry.name !== 'Empty' && pastry.name !== 'Locked' && pastry.name !== 'Unlocked') {
      if (true && pastry.name !== 'Empty' && pastry.name !== 'Locked' && pastry.name !== 'Unlocked') {
        const amountSold: number = randomAmount(pastry.qty);
        gainMoney(pastry.price * amountSold);

        // reputation gained depends on pastry quality
        // multiplier for exp gained depends on pastry quality
        switch (pastry.quality) {
          case 'Poor':
            gainRep(5 * amountSold);
            gainExp(pastry.price * amountSold, 0.1);
            break;
          case 'Decent':
            gainRep(7 * amountSold);
            gainExp(pastry.price * amountSold, 0.2);
            break;
          case 'Good':
            gainRep(10 * amountSold);
            gainExp(pastry.price * amountSold, 0.3);
            break;
          case 'Great':
            gainRep(15 * amountSold);
            gainExp(pastry.price * amountSold, 0.4);
            break;
          case 'Excellent':
            gainRep(20 * amountSold);
            gainExp(pastry.price * amountSold, 0.5);
            break;
          default:
            console.log('Invalid quality.');
        }

        const pastrySold = {
          name: pastry.name,
          price: pastry.price,
          quality: pastry.quality,
          qty: amountSold,
        };
        setModalData((prevState: IEndDayModal) => ({
          ...prevState,
          pastriesSold: [...prevState.pastriesSold, pastrySold],
        }));
        deductPastry(pastry, amountSold);
      }
    });
  };

  const gainMoney = (moneyGained: number) => {
    setPlayerCash((prevState: number) => prevState + moneyGained);
    setModalData((prevState: IEndDayModal) => ({
      ...prevState,
      cashEarned: (prevState.cashEarned += moneyGained),
    }));
    setPlayerCash((prevState: number) => prevState + moneyGained);
    console.log(`You gained $${moneyGained}. Cash: ${playerCash}`);
  };

  const gainRep = (repGained: number) => {
    if (playerRep >= 1000) return;

    if (playerRep + repGained >= 1000) {
      setPlayerRep(1000);
      setModalData((prevState: IEndDayModal) => ({
        ...prevState,
        repEarned: 1000 - playerRep,
      }));
    } else {
      setPlayerRep((prevState: number) => prevState + repGained);
      setModalData((prevState: IEndDayModal) => ({
        ...prevState,
        repEarned: (prevState.repEarned += repGained),
      }));
    }
    console.log(`You gained ${repGained} reputation. Reputation: ${playerRep}`);
  };

  const gainExp = (expGained: number, multiplier: number) => {
    const calculatedExp: number = expGained + Math.trunc(expGained * multiplier);
    setPlayerCurrentExp((prevState: number) => prevState + calculatedExp);
    setTotalExpGained((prevState: number) => prevState + calculatedExp);
  };

  const deductPastry = (pastry: IPastriesOnDisplay, amountSold: number) => {
    if (pastry.qty > 1 && pastry.qty !== amountSold) {
      let storagePastryToDeduct = Storage.bakedGoods.find(
        (deductedPastry: IBakedGoods) => deductedPastry.name === pastry.name && deductedPastry.quality === pastry.quality
      );
      storagePastryToDeduct.qty -= amountSold;

      let displayPastryToDeduct = Storage.pastriesOnDisplay.find(
        (deductedPastry: IPastriesOnDisplay) => deductedPastry.name === pastry.name && deductedPastry.quality === pastry.quality
      );
      displayPastryToDeduct.qty -= amountSold;
    } else {
      Storage.bakedGoods = Storage.bakedGoods.filter(
        (removedPastry: IBakedGoods) => `${removedPastry.name} (${removedPastry.quality})` !== `${pastry.name} (${pastry.quality})`
      );
      setBakedGoods(Storage.bakedGoods);

      Storage.pastriesOnDisplay[pastry.order].name = 'Empty';
      Storage.pastriesOnDisplay[pastry.order].qty = 0;
      Storage.pastriesOnDisplay[pastry.order].price = 0;
      Storage.pastriesOnDisplay[pastry.order].quality = 'N/A';
      Storage.pastriesOnDisplay[pastry.order].order = pastry.order;
    }
  };

  const levelUp = () => {
    if (playerLevel >= 25) return;
    if (playerCurrentExp < playerExpToLevel) return;

    let levelUps: number = 0;
    let expToLevel: number = playerExpToLevel;

    for (let i = 1; i <= 25 - playerLevel; i++) {
      if (Math.trunc(playerCurrentExp / expToLevel) >= 1) {
        levelUps += 1;
        expToLevel += 500;
      }
    }

    setPlayerLevel((prevState: number) => prevState + levelUps);
    setPlayerExpToLevel(expToLevel);
  };

  const unlockDisplaySlot = () => {
    const maxDisplaySlot: number = (Storage.pastriesOnDisplay.length - 2) * 10;
    let displaySlotLevel: number = 10; // first slot unlocked at level 10
    let displaySlotIndex: number = 2; // first slot on index 2

    for (let i = 0; i <= maxDisplaySlot; i += 10) {
      if (playerLevel >= displaySlotLevel) {
        Storage.pastriesOnDisplay[displaySlotIndex].name = 'Unlocked';
        displaySlotLevel += 10;
        if (displaySlotIndex < Storage.pastriesOnDisplay.length) {
          displaySlotIndex += 1;
          setPastriesOnDisplay((prevState: IPastriesOnDisplay[]) => [...prevState]);
        }
      }
    }
  };

  return (
    <Layout.Content style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography.Title level={2}>Home Sweet Home</Typography.Title>
      <Row style={{ flexGrow: 1, flexWrap: 'wrap-reverse' }}>
        <Col span={isMobile ? 24 : 16} style={{ display: 'flex', flexDirection: 'column', paddingRight: isMobile ? 0 : '2rem' }}>
          <section style={{ marginBottom: '1rem' }}>
            <Divider plain orientation='left'>
              <Typography.Title level={5} style={{ fontWeight: 600, marginRight: '4px' }}>
                Pastries Baked
              </Typography.Title>
            </Divider>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {Player.unlockedRecipes.map((unlockedRecipe: IUnlockedRecipes, index: number) => (
                <div key={index} className={styles.unlockedItems}>
                  <Image
                    alt={unlockedRecipe.name}
                    height={40}
                    width={40}
                    src={`/icons/recipes/${Recipes.find((recipe: IRecipes) => recipe.name === unlockedRecipe.name).image}`}
                  ></Image>
                  <Typography.Text strong>{unlockedRecipe.amountBaked}</Typography.Text>
                </div>
              ))}
            </div>
          </section>
          <section style={{ flexGrow: 1 }}>
            <Divider plain orientation='left'>
              <Typography.Title level={5} style={{ fontWeight: 600, marginRight: '4px' }}>
                Equipment Unlocked
              </Typography.Title>
            </Divider>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {unlockedEquipment.length !== 0 &&
                unlockedEquipment.map((unlockedEquipment: string, index: number) => (
                  <div key={index} className={styles.unlockedItems}>
                    <Image
                      alt={unlockedEquipment}
                      height={40}
                      width={40}
                      src={`/icons/equipment/${Items.equipment.find((equipment: IItemsEquipment) => equipment.name === unlockedEquipment).image}`}
                    ></Image>
                  </div>
                ))}
            </div>
          </section>
          <Button style={{ height: '45px', width: '100%' }} onClick={endDay}>
            End Day
          </Button>
          <EndDay
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            modalData={modalData}
            setModalData={setModalData}
            totalExpGained={totalExpGained}
            setTotalExpGained={setTotalExpGained}
          />
        </Col>
        <Col span={isMobile ? 24 : 8}>
          <PlayerLevel />
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default Home;
