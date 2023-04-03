import actionTypes from "../data/actionTypes";
import IAction from "../interfaces/IAction";

const whoWin = (playerAction: IAction, computerAction: IAction) => {
    if (playerAction.name === computerAction.name)
        return 'draw';

    if ((playerAction.name === 'rock' && computerAction.name === 'scissors') ||
        (playerAction.name === 'scissors' && computerAction.name === 'leaf') ||
        (playerAction.name === 'leaf' && computerAction.name === 'rock')
    )
        return 'player';
    return 'computer';
}

const createComputerAction = () => {
    const computerSign = actionTypes[Math.floor(Math.random() * 3)];

    const computerAction: IAction = {
        name: computerSign,
        launchDate: ''
    };

    return computerAction;
}

const isThereANextRound = (queue: IAction[]) => {
    if (!queue?.length)
        return false;

    const currentDate = new Date();
    const nextActionDate = new Date(queue[0].launchDate);

    const currentDateValue = currentDate.getTime();
    const nextActionDateValue = nextActionDate.getTime();

    if (currentDateValue > nextActionDateValue)
        return false;
    return true;
}

export {
    whoWin,
    createComputerAction,
    isThereANextRound
};