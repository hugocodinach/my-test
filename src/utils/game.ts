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

export {
    whoWin
};