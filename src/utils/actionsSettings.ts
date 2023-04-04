import actionsMaxCredit from "../data/actionsMaxCredit";
import creditsRefreshInterval from "../data/creditsRefreshInterval";
import minCreditsPercent from "../data/minCreditsPercent";
import IActionsSettings from "../interfaces/IActionsSettings";
import TActionsCreditsMap from "../types/TActionsCreditsMap";

const getRandomValueInRange = (maxValue: number) => {
    const minValue = maxValue * minCreditsPercent;
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