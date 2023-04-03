import actionTypes from "../data/actionTypes";
import creditsRefreshInterval from "../data/creditsRefreshInterval";
import IActionsSettings from "../interfaces/IActionsSettings";
import TActionsCreditsMap from "../types/TActionsCreditsMap";

type maxCreditMap = {
    [key: typeof actionTypes[number]]: number;
}

const actionsMaxCredit: maxCreditMap = {
    'rock': 30,
    'leaf': 20,
    'scissors': 25
};

const getRandomValueInRange = (maxValue: number) => {
    const minValue = maxValue * 0.85;
    const brutValue = Math.random() * (maxValue - minValue) + minValue;

    return Math.round(brutValue);
}

const computeActionsSettings = (oldRefreshDate?: string) => {
    const actionsCreditsMap: TActionsCreditsMap = {
        'rock': {
            maxCredit: actionsMaxCredit.rock,
            remainingCredits: getRandomValueInRange(actionsMaxCredit.rock)
        },
        'leaf': {
            maxCredit: actionsMaxCredit.leaf,
            remainingCredits: getRandomValueInRange(actionsMaxCredit.leaf)
        },
        'scissors': {
            maxCredit: actionsMaxCredit.scissors,
            remainingCredits: getRandomValueInRange(actionsMaxCredit.scissors)
        }
    };

    const newDate = oldRefreshDate ? new Date(oldRefreshDate) : new Date();

    newDate.setTime(newDate.getTime() + creditsRefreshInterval);

    const actionsSettings: IActionsSettings = {
        actionsCredits: actionsCreditsMap,
        nextRefresh: newDate.toISOString()
    };

    return actionsSettings;
}

export default computeActionsSettings;