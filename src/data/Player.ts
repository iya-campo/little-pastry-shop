import { IPlayer } from '@/types/PastryShop';

const EXP_INC = 500;

export const Player: IPlayer = {
    id: '000',
    name: 'Bread Connoisseur',
    level: 1,
    get currentExp() {
        return (this.level * EXP_INC) - EXP_INC
    },
    get expToLevel() {
        return this.level * EXP_INC
    },
    cash: 2000,
    rep: 1,
    daysPlayed: 3,
    unlockedRecipes: [
        {
            name: 'Biscuits',
            mastery: 0,
            amountBaked: 2
        },
        {
            name: 'Doughnut',
            mastery: 10,
            amountBaked: 0
        }
    ],
    unlockedEquipment: [],
}

export default Player;