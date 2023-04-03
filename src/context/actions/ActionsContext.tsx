import React from 'react';
import actionTypes from '../../data/actionTypes';
import IAction from '../../interfaces/IAction';
import IActionsSettings from '../../interfaces/IActionsSettings';
import IRound from '../../interfaces/IRound';

interface ActionsContextInterface {
    addActionToQueue: (name: (typeof actionTypes)[number]) => void;
    popActionQueue: () => void;
    queue: IAction[] | null;
    play: (action: IAction) => void;
    lastRound: IRound;
    playerScore: number;
    computerScore: number;
    actionsSettings: IActionsSettings;
}

export default React.createContext<ActionsContextInterface>({} as ActionsContextInterface);
