export const determineQuality = (mastery: number) => {
    if (mastery >= 0 && mastery <= 19) {
        return 'Poor';
    } else if (mastery >= 20 && mastery <= 49) {
        return 'Decent';
    } else if (mastery >= 50 && mastery <= 69) {
        return 'Good';
    } else if (mastery >= 70 && mastery <= 99) {
        return 'Great';
    } else {
        return 'Excellent';
    }
}

export const determineSuccess = (successRate: number) => {
    const num: number = Math.round(Math.floor(Math.random() * 11))

    if (num <= successRate / 10) { 
        return true;
    } else { 
        return false;
    }
}

export const randomAmount = (maxNum: number, minNum?: number) => {
    const max: number = maxNum;
    const min: number = minNum ? minNum : 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
}
