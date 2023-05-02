import { IPlayer } from '@/types/PastryShop';

export const Player: IPlayer = {
    name: 'May',
    level: 4,
    currentExp: 0,
    expToLevel: 100,
    cash: 1000,
    rep: 0,
    unlockedRecipes: [
        {
            name: 'biscuits',
            mastery: 0,
        }
    ],
    unlockedEquipment: ['mixing bowl'],
}

export default Player;