import React from 'react';
import actionNames from '../../interfaces/actionNames';
import IAction from '../../interfaces/IAction';
import IRound from '../../interfaces/IRound';

interface ActionsContextInterface {
    addActionToQueue: (name: (typeof actionNames)[number]) => void;
    popActionQueue: () => void;
    queue: IAction[] | null;
    play: (action: IAction) => void;
    lastRound: IRound;
    playerScore: number;
    computerScore: number;
}

export default React.createContext<ActionsContextInterface>({} as ActionsContextInterface);
