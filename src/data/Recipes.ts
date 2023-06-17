import { IRecipes } from '@/types/PastryShop';

const Recipes: IRecipes[] = [
    {
        id: 0,
        name: 'Biscuits',
        levelRequirement: 0,
        price: 25,
        ingredients: [
            {
                name: 'All-purpose Flour',
                qty: 1
            },
            {
                name: 'Sugar',
                qty: 1
            },
            {
                name: 'Salt',
                qty: 1
            },
            {
                name: 'Butter',
                qty: 1
            },
            {
                name: 'Milk',
                qty: 1
            },
        ],
        equipment: ['Mixing Bowl'],
        image: 'biscuits.png'
    },
    {
        id: 1,
        name: 'Cookies',
        levelRequirement: 2,
        price: 40,
        ingredients: [
            {
                name: 'All-purpose Flour',
                qty: 1
            },
            {
                name: 'Sugar',
                qty: 1
            },
            {
                name: 'Salt',
                qty: 1
            },
            {
                name: 'Butter',
                qty: 1
            },
            {
                name: 'Chocolate Chips',
                qty: 1
            },
        ],
        equipment: ['Mixing Bowl'],
        image: 'cookies.png'
    },
    {
        id: 2,
        name: 'Doughnut',
        levelRequirement: 4,
        price: 50,
        ingredients: [
            {
                name: 'All-purpose Flour',
                qty: 1
            },
            {
                name: 'Sugar',
                qty: 1
            },
            {
                name: 'Eggs',
                qty: 1
            },
            {
                name: 'Vanilla',
                qty: 1
            },
            {
                name: 'Milk',
                qty: 1
            },
        ],
        equipment: ['Mixing Bowl'],
        image: 'doughnut.png'
    },
    {
        id: 3,
        name: 'Muffins',
        levelRequirement: 6,
        price: 70,
        ingredients: [
            {
                name: 'All-purpose Flour',
                qty: 1
            },
            {
                name: 'Eggs',
                qty: 1
            },
            {
                name: 'Sugar',
                qty: 1
            },
            {
                name: 'Blueberry',
                qty: 1
            },
            {
                name: 'Baking Powder',
                qty: 1
            },
        ],
        equipment: ['Mixing Bowl', 'Cooling Rack'],
        image: 'muffins.png'
    },
    {
        id: 4,
        name: 'Croissant',
        levelRequirement: 8,
        price: 100,
        ingredients: [
            {
                name: 'All-purpose Flour',
                qty: 1
            },
            {
                name: 'Sugar',
                qty: 1
            },
            {
                name: 'Salt',
                qty: 1
            },
            {
                name: 'Eggs',
                qty: 1
            },
            {
                name: `Baker's Yeast`,
                qty: 1
            },
        ],
        equipment: ['Mixing Bowl', 'Cooling Rack'],
        image: 'croissant.png'
    },
    {
        id: 5,
        name: 'Eclair',
        levelRequirement: 12,
        price: 120,
        ingredients: [
            {
                name: 'All-purpose Flour',
                qty: 1
            },
            {
                name: 'Sugar',
                qty: 1
            },
            {
                name: 'Butter',
                qty: 1
            },
            {
                name: 'Chocolate Chips',
                qty: 1
            },
            {
                name: 'Whipped Cream',
                qty: 1
            },
        ],
        equipment: ['Cooling Rack', 'Spatula'],
        image: 'eclair.png'
    },
    {
        id: 6,
        name: 'Cheesecake',
        levelRequirement: 14,
        price: 150,
        ingredients: [
            {
                name: 'Eggs',
                qty: 1
            },
            {
                name: 'Cream Cheese',
                qty: 1
            },
            {
                name: 'Sugar',
                qty: 1
            },
            {
                name: 'Butter',
                qty: 1
            },
            {
                name: 'Graham Cracker',
                qty: 1
            },
        ],
        equipment: ['Mixing Bowl', 'Spatula'],
        image: 'cheesecake.png'
    },
    {
        id: 7,
        name: 'Chocolate Cake',
        levelRequirement: 16,
        price: 200,
        ingredients: [
            {
                name: 'All-purpose Flour',
                qty: 1
            },
            {
                name: 'Chocolate',
                qty: 1
            },
            {
                name: 'Cream',
                qty: 1
            },
            {
                name: 'Eggs',
                qty: 1
            },
            {
                name: 'Baking Powder',
                qty: 1
            },
        ],
        equipment: ['Mixing Bowl', 'Spatula', 'Cooling Rack'],
        image: 'chocolate-cake.png'
    },
    {
        id: 8,
        name: 'Apple Pie',
        levelRequirement: 18,
        price: 250,
        ingredients: [
            {
                name: 'All-purpose Flour',
                qty: 1
            },
            {
                name: 'Apple',
                qty: 1
            },
            {
                name: 'Eggs',
                qty: 1
            },
            {
                name: 'Butter',
                qty: 1
            },
            {
                name: 'Pie Crust',
                qty: 1
            },
        ],
        equipment: ['Mixing Bowl', 'Spatula', 'Rolling Pin'],
        image: 'apple-pie.png'
    },
    {
        id: 9,
        name: 'Baguette',
        levelRequirement: 21,
        price: 300,
        ingredients: [
            {
                name: 'All-purpose Flour',
                qty: 1
            },
            {
                name: 'Bread',
                qty: 1
            },
            {
                name: `Baker's Yeast`,
                qty: 1
            },
            {
                name: 'Salt',
                qty: 1
            },
        ],
        equipment: ['Mixing Bowl', 'Speed Mixer'],
        image: 'baguette.png'
    },
    {
        id: 10,
        name: 'Macaroons',
        levelRequirement: 24,
        price: 350,
        ingredients: [
            {
                name: 'Almond Flour',
                qty: 1
            },
            {
                name: 'Sugar',
                qty: 1
            },
            {
                name: 'Eggs',
                qty: 2
            },
            {
                name: 'Butter',
                qty: 1
            },
            {
                name: 'Milk',
                qty: 1
            },
        ],
        equipment: ['Mixing Bowl', 'Speed Mixer', 'Measuring Spoons'],
        image: 'macaroons.png'
    },
]

export default Recipes;