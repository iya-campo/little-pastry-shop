import { IRecipes } from '@/types/PastryShop';

const Recipes: IRecipes[] = [
    {
        id: 0,
        name: 'Biscuits',
        levelRequirement: 0,
        price: 25,
        ingredients: [
            {
                name: 'all-purpose flour',
                qty: 1
            },
            {
                name: 'sugar',
                qty: 1
            },
            {
                name: 'salt',
                qty: 1
            },
            {
                name: 'butter',
                qty: 1
            },
            {
                name: 'milk',
                qty: 1
            },
        ],
        equipment: ['mixing bowl'],
        image: 'biscuits.png'
    },
    {
        id: 1,
        name: 'Cookies',
        levelRequirement: 2,
        price: 40,
        ingredients: [
            {
                name: 'all-purpose flour',
                qty: 1
            },
            {
                name: 'sugar',
                qty: 1
            },
            {
                name: 'salt',
                qty: 1
            },
            {
                name: 'butter',
                qty: 1
            },
            {
                name: 'chocolate chips',
                qty: 1
            },
        ],
        equipment: ['mixing bowl'],
        image: 'cookies.png'
    },
    {
        id: 2,
        name: 'Doughnut',
        levelRequirement: 4,
        price: 50,
        ingredients: [
            {
                name: 'all-purpose flour',
                qty: 1
            },
            {
                name: 'sugar',
                qty: 1
            },
            {
                name: 'eggs',
                qty: 1
            },
            {
                name: 'vanilla',
                qty: 1
            },
            {
                name: 'milk',
                qty: 1
            },
        ],
        equipment: ['mixing bowl'],
        image: 'doughnut.png'
    },
    {
        id: 3,
        name: 'Muffins',
        levelRequirement: 6,
        price: 70,
        ingredients: [
            {
                name: 'all-purpose flour',
                qty: 1
            },
            {
                name: 'egg',
                qty: 1
            },
            {
                name: 'sugar',
                qty: 1
            },
            {
                name: 'blueberry',
                qty: 1
            },
            {
                name: 'baking powder',
                qty: 1
            },
        ],
        equipment: ['mixing bowl', 'cooling rank'],
        image: 'muffins.png'
    },
    {
        id: 4,
        name: 'Croissant',
        levelRequirement: 8,
        price: 100,
        ingredients: [
            {
                name: 'all-purpose flour',
                qty: 1
            },
            {
                name: 'sugar',
                qty: 1
            },
            {
                name: 'salt',
                qty: 1
            },
            {
                name: 'egg',
                qty: 1
            },
            {
                name: `baker's yeast`,
                qty: 1
            },
        ],
        equipment: ['mixing bowl', 'cooling rank'],
        image: 'croissant.png'
    },
    {
        id: 5,
        name: 'Eclair',
        levelRequirement: 12,
        price: 120,
        ingredients: [
            {
                name: 'all-purpose flour',
                qty: 1
            },
            {
                name: 'sugar',
                qty: 1
            },
            {
                name: 'butter',
                qty: 1
            },
            {
                name: 'chocolate chips',
                qty: 1
            },
            {
                name: 'whipped cream',
                qty: 1
            },
        ],
        equipment: ['cooling rack', 'spatula'],
        image: 'eclair.png'
    },
    {
        id: 6,
        name: 'Cheesecake',
        levelRequirement: 14,
        price: 150,
        ingredients: [
            {
                name: 'egg',
                qty: 1
            },
            {
                name: 'cream cheese',
                qty: 1
            },
            {
                name: 'sugar',
                qty: 1
            },
            {
                name: 'butter',
                qty: 1
            },
            {
                name: 'graham cracker',
                qty: 1
            },
        ],
        equipment: ['mixing bowl', 'spatula'],
        image: 'cheesecake.png'
    },
    {
        id: 7,
        name: 'Chocolate Cake',
        levelRequirement: 16,
        price: 200,
        ingredients: [
            {
                name: 'all-purpose flour',
                qty: 1
            },
            {
                name: 'chocolate',
                qty: 1
            },
            {
                name: 'cream',
                qty: 1
            },
            {
                name: 'egg',
                qty: 1
            },
            {
                name: 'baking powder',
                qty: 1
            },
        ],
        equipment: ['mixing bowl', 'spatula', 'cooling rack'],
        image: 'chocolate-cake.png'
    },
    {
        id: 8,
        name: 'Apple Pie',
        levelRequirement: 18,
        price: 250,
        ingredients: [
            {
                name: 'all-purpose flour',
                qty: 1
            },
            {
                name: 'apple',
                qty: 1
            },
            {
                name: 'egg',
                qty: 1
            },
            {
                name: 'butter',
                qty: 1
            },
            {
                name: 'pie crust',
                qty: 1
            },
        ],
        equipment: ['mixing bowl', 'spatula', 'rolling pin'],
        image: 'apple-pie.png'
    },
    {
        id: 9,
        name: 'Baguette',
        levelRequirement: 21,
        price: 300,
        ingredients: [
            {
                name: 'all-purpose flour',
                qty: 1
            },
            {
                name: 'bread',
                qty: 1
            },
            {
                name: `baker's yeast`,
                qty: 1
            },
            {
                name: 'salt',
                qty: 1
            },
        ],
        equipment: ['mixing bowl', 'speed mixer'],
        image: 'baguette.png'
    },
    {
        id: 10,
        name: 'Macaroons',
        levelRequirement: 24,
        price: 350,
        ingredients: [
            {
                name: 'almond flour',
                qty: 1
            },
            {
                name: 'sugar',
                qty: 1
            },
            {
                name: 'eggs',
                qty: 2
            },
            {
                name: 'butter',
                qty: 1
            },
            {
                name: 'milk',
                qty: 1
            },
        ],
        equipment: ['mixing bowl', 'speed mixer', 'measuring spoons'],
        image: 'macaroons.png'
    },
]

export default Recipes;