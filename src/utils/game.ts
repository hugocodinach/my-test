import IAction from "../interfaces/IAction";

const whoWin = (playerAction: IAction, computerAction: IAction) => {
    if (playerAction.name === computerAction.name)
        return 'draw';

    if ((playerAction.name === 'Pierre' && computerAction.name === 'Ciseaux') ||
        (playerAction.name === 'Ciseaux' && computerAction.name === 'Feuille') ||
        (playerAction.name === 'Feuille' && computerAction.name === 'Pierre')
    )
        return 'player';
    return 'computer';
}

export {
    whoWin
};