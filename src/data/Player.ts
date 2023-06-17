import { IPlayer } from '@/types/PastryShop';

const EXP_INC = 500;

export const Player: IPlayer = {
    id: '000',
    name: 'Bread Connoisseur',
    level: 5,
    get currentExp() {
        return (this.level * EXP_INC) - EXP_INC
    },
    get expToLevel() {
        return this.level * EXP_INC
    },
    cash: 1000,
    rep: 100,
    daysPlayed: 3,
    unlockedRecipes: [
        {
            name: 'Biscuits',
            mastery: 10,
            amountBaked: 50
        },
        {
            name: 'Doughnut',
            mastery: 10,
            amountBaked: 50
        }
    ],
    unlockedEquipment: ['Mixing Bowl'],
}

export default Player;