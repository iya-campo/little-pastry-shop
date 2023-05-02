import { IStorage } from "@/types/PastryShop";

const Storage: IStorage = {
    bakedGoods: [
        {
            name: 'biscuits',
            mastery: 0,
        }
    ],
    ingredients: [
        {
            name: 'eggs',
            qty: 1
        },
        {
            name: 'milk',
            qty: 1
        }
    ],
    pastriesOnDisplay: [
        {
            name: 'biscuits',
            qty: 1
        },
        {
            name: 'biscuits',
            qty: 1
        },
    ]
}

export default Storage;