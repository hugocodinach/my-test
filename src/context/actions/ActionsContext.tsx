import React from 'react';
import actionNames from '../../interfaces/actionNames';
import IAction from '../../interfaces/IAction';

interface ActionsContextInterface {
    addActionToQueue: (name: (typeof actionNames)[number]) => void;
    popActionQueue: () => void;
    queue: IAction[] | null;
}

export default React.createContext<ActionsContextInterface>({} as ActionsContextInterface);
