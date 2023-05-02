export interface IItems {
    equipment: IItemsEquipment[],
    ingredients: IItemsIngredients[]
}

export interface IItemsEquipment {
    id: number,
    name: string,
    price: number,
    levelRequirement: number
}

export interface IItemsIngredients {
    id: number,
    name: string,
    price: number
}

export interface IPlayer {
    name: string,
    level: number,
    currentExp: number,
    expToLevel: number,
    cash: number,
    rep: number,
    unlockedRecipes: {
        name: string,
        mastery: number
    }[],
    unlockedEquipment: string[]
}

export interface IRecipes {
    id: number,
    name: string,
    levelRequirement: number,
    price: number,
    ingredients: IIngredients[],
    equipment: string[]
}

export interface IStorage {
    bakedGoods: { 
        name: string, 
        mastery: number 
    }[],
    ingredients: IIngredients[],
    pastriesOnDisplay: IPastriesOnDisplay[],
}

export interface IItem {
    name?: string;
    qty?: number;
}

export interface IIngredients extends IItem {}

export interface IPastriesOnDisplay extends IItem {}
