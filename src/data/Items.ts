import { IItems } from "@/types/PastryShop";

export const Items: IItems = {
    equipment: [
        {
            id: 11,
            name: 'Mixing Bowl',
            price: 100,
            levelRequirement: 0,
            category: 'Equipment',
            image: 'mixing-bowl.png'
        },
        {
            id: 12,
            name: 'Cooling Rack',
            price: 100,
            levelRequirement: 5,
            category: 'Equipment',
            image: 'cooling-rack.png'
        },
        {
            id: 13,
            name: 'Spatula',
            price: 100,
            levelRequirement: 10,
            category: 'Equipment',
            image: 'spatula.png'
        },
        {
            id: 14,
            name: 'Rolling Pin',
            price: 100,
            levelRequirement: 15,
            category: 'Equipment',
            image: 'macaroons.png'
        },
        {
            id: 15,
            name: 'Speed Mixer',
            price: 100,
            levelRequirement: 20,
            category: 'Equipment',
            image: 'speed-mixer.png'
        },
        {
            id: 16,
            name: 'Measuring Spoons',
            price: 100,
            levelRequirement: 25,
            category: 'Equipment',
            image: 'measuring-spoons.png'
        },
    ],
    ingredients: [
        {
            id: 17,
            name: 'All-purpose Flour',
            price: 10,
            category: 'Ingredient'
        },
        {
            id: 18,
            name: 'Sugar',
            price: 10,
            category: 'Ingredient'
        },
        {
            id: 19,
            name: 'Salt',
            price: 10,
            category: 'Ingredient'
        },
        {
            id: 20,
            name: 'Butter',
            price: 10,
            category: 'Ingredient'
        },
        {
            id: 21,
            name: 'Milk',
            price: 10,
            category: 'Ingredient'
        },
        {
            id: 22,
            name: 'Chocolate Chips',
            price: 10,
            category: 'Ingredient'
        },
        {
            id: 23,
            name: 'Eggs',
            price: 10,
            category: 'Ingredient'
        },
        {
            id: 24,
            name: 'Vanilla',
            price: 10,
            category: 'Ingredient'
        },
        {
            id: 25,
            name: 'Blueberry',
            price: 10,
            category: 'Ingredient'
        },
        {
            id: 26,
            name: 'Baking Powder',
            price: 10,
            category: 'Ingredient'
        },
        {
            id: 27,
            name: `Baker's Yeast`,
            price: 10,
            category: 'Ingredient'
        },
        {
            id: 28,
            name: 'Whipped Cream',
            price: 10,
            category: 'Ingredient'
        },
        {
            id: 29,
            name: 'Cream Cheese',
            price: 10,
            category: 'Ingredient'
        },
        {
            id: 30,
            name: 'Graham Cracker',
            price: 10,
            category: 'Ingredient'
        },
        {
            id: 31,
            name: 'Cream',
            price: 10,
            category: 'Ingredient'
        },
        {
            id: 32,
            name: 'Chocolate',
            price: 10,
            category: 'Ingredient'
        },
        {
            id: 33,
            name: 'Apple',
            price: 10,
            category: 'Ingredient'
        },
        {
            id: 34,
            name: 'Pie Crust',
            price: 10,
            category: 'Ingredient'
        },
        {
            id: 35,
            name: 'Almond Flour',
            price: 10,
            category: 'Ingredient'
        },
    ]
}

export default Items;