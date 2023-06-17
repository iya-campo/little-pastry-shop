import { IStorage } from "@/types/PastryShop";

const Storage: IStorage = {
    bakedGoods: [
        {
            name: 'Biscuits',
            qty: 50,
            price: 25,
            quality: 'Good'
        },
        {
            name: 'Doughnut',
            qty: 50,
            price: 25,
            quality: 'Excellent',
        },{
            name: 'Doughnut',
            qty: 1,
            price: 50,
            quality: 'Poor',
        }
    ],
    ingredients: [
        {
            name: 'Eggs',
            qty: 20,
            category: 'Ingredient'
        },
        {
            name: 'Milk',
            qty: 20,
            category: 'Ingredient'
        },
        {
            name: 'Vanilla',
            qty: 20,
            category: 'Ingredient'
        },
        {
            name: 'All-purpose Flour',
            qty: 20,
            category: 'Ingredient'
        },
        {
            name: 'Sugar',
            qty: 20,
            category: 'Ingredient'
        },
        {
            name: 'Cream',
            qty: 1,
            category: 'Ingredient'
        },
    ],
    pastriesOnDisplay: [
        {
            name: 'Empty',
            qty: 0,
            price: 0,
            quality: 'N/A',
            order: 0
        },
        {
            name: 'Doughnut',
            qty: 1,
            price: 50,
            quality: 'Poor',
            order: 1
        },
        {
            name: 'Locked',
            qty: 0,
            price: 0,
            quality: 'N/A',
            order: 2
        },
        {
            name: 'Locked',
            qty: 0,
            price: 0,
            quality: 'N/A',
            order: 3
        },
    ]
}

export default Storage;