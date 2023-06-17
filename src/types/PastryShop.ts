export interface IItems {
    equipment: IItemsEquipment[],
    ingredients: IItemsIngredients[]
}

export interface IItemsEquipment {
    id: number,
    name: string,
    price: number,
    levelRequirement: number,
    category: string,
    image: string
}

export interface IItemsIngredients {
    id: number,
    name: string,
    price: number,
    category: string
}

export interface IPlayer {
    id: string,
    name: string,
    level: number,
    currentExp: number,
    expToLevel: number,
    cash: number,
    rep: number,
    daysPlayed: number,
    unlockedRecipes: IUnlockedRecipes[],
    unlockedEquipment: string[]
}

export interface IUnlockedRecipes {
    name: string,
    mastery: number,
    amountBaked: number
}

export interface IRecipes {
    id: number,
    name: string,
    levelRequirement: number,
    price: number,
    ingredients: IIngredients[],
    equipment: string[],
    image: string
}

export interface IStorage {
    bakedGoods: IBakedGoods[],
    ingredients: IIngredients[],
    pastriesOnDisplay?: IPastriesOnDisplay[],
}

export interface IItem {
    name: string,
    qty: number,
    category?: string
}

export interface IIngredients extends IItem {}

export interface ICartItem extends IItem {
    price: number,
}

export interface IBakedGoods extends IItem {
    price: number,
    quality: "Poor" | "Decent" | "Good" | "Great" | "Excellent" | "N/A"
}

export interface IOrderedSlots {
    order: number
}

export interface IEquipmentSlot extends IOrderedSlots {
    name: string,
}

export interface IPastriesOnDisplay extends IBakedGoods, IOrderedSlots {}

export interface IEndDayModal {
    pastriesSold: IBakedGoods[],
    cashEarned: number,
    repEarned: number
}
