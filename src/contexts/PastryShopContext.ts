import { Dispatch, SetStateAction, createContext } from 'react'
import { IBakedGoods, IIngredients, IItems, IPastriesOnDisplay, IPlayer, IRecipes, IStorage, IUnlockedRecipes } from '@/types/PastryShop';
import Player from '@/data/Player';
import Storage from '@/data/Storage';
import Recipes from '@/data/Recipes';
import Items from '@/data/Items';

interface IPastryShopContext {
    Player: IPlayer,
    Storage: IStorage,
    Recipes: IRecipes[],
    Items: IItems,
    playerLevel: number,
    setPlayerLevel: Dispatch<SetStateAction<number>>,
    playerCurrentExp: number,
    setPlayerCurrentExp: Dispatch<SetStateAction<number>>,
    playerExpToLevel: number,
    setPlayerExpToLevel: Dispatch<SetStateAction<number>>,
    playerCash: number,
    setPlayerCash: Dispatch<SetStateAction<number>>,
    playerRep: number,
    setPlayerRep: Dispatch<SetStateAction<number>>,
    storageIngredients: IIngredients[],
    setStorageIngredients: Dispatch<SetStateAction<IIngredients[]>>,
    unlockedRecipes: IUnlockedRecipes[],
    setUnlockedRecipes: Dispatch<SetStateAction<IUnlockedRecipes[]>>,
    unlockedEquipment: string[],
    setUnlockedEquipment: Dispatch<SetStateAction<string[]>>,
    bakedGoods: IBakedGoods[],
    setBakedGoods: Dispatch<SetStateAction<IBakedGoods[]>>,
    pastriesOnDisplay: IPastriesOnDisplay[],
    setPastriesOnDisplay: Dispatch<SetStateAction<IPastriesOnDisplay[]>>,
    tabHeight: number,
    setTabHeight: Dispatch<SetStateAction<number>>,
    isMobile: boolean,
}

export const PastryShopContext = createContext<IPastryShopContext>({
    Player: Player, 
    Storage: Storage, 
    Recipes: Recipes, 
    Items: Items, 
    playerLevel: Player.level,
    setPlayerLevel: null,
    playerCurrentExp: Player.currentExp,
    setPlayerCurrentExp: null,
    playerExpToLevel: Player.expToLevel,
    setPlayerExpToLevel: null,
    playerCash: Player.cash,
    setPlayerCash: null,
    playerRep: Player.rep,
    setPlayerRep: null,
    storageIngredients: Storage.ingredients,
    setStorageIngredients: null,
    unlockedRecipes: Player.unlockedRecipes,
    setUnlockedRecipes: null,
    unlockedEquipment: Player.unlockedEquipment,
    setUnlockedEquipment: null,
    bakedGoods: Storage.bakedGoods,
    setBakedGoods: null,
    pastriesOnDisplay: Storage.pastriesOnDisplay,
    setPastriesOnDisplay: null,
    tabHeight: 0, 
    setTabHeight: null,
    isMobile: false, 
})

export default PastryShopContext;