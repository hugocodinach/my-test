import { PropsWithChildren, useEffect, useRef, useState } from 'react';

import IAction from '../../interfaces/IAction';
import IActionsSettings from '../../interfaces/IActionsSettings';
import IRound from '../../interfaces/IRound';
import TActionName from '../../types/TActionName';

import { createNewActionFromName, skipNextAction } from '../../utils/actionsManagement';
import computeActionsSettings from '../../utils/actionsSettings';
import { getDateDelay } from '../../utils/date';
import { createComputerAction, whoWin } from '../../utils/game';

import ActionsContext from './ActionsContext';

export default function ActionsProvider({
    children
}: PropsWithChildren) {
    const [queue, setQueue] = useState<IAction[] | null>(null);
    const [playerScore, setPlayerScore] = useState<number | null>(null);
    const [computerScore, setComputerScore] = useState<number | null>(null);
    const [lastRound, setLastRound] = useState<IRound | null>(null);
    const [actionsSettings, setActionsSettings] = useState<IActionsSettings | null>(null);

    const timeoutId = useRef(null);

    const addActionToQueue = (name: TActionName) => {
        if (!queue)
            return;

        const newAction: IAction = createNewActionFromName(queue, name);

        setQueue(oldQueue => {
            const newQueue = oldQueue ? [...oldQueue, newAction] : [newAction];

            return newQueue;
        });
    }

    const popActionQueue = () => {
        setQueue(oldQueue => {
            const newQueue = oldQueue ? oldQueue.slice(1) : [];

            return newQueue;
        });
    }

    const play = (playerAction: IAction) => {
        if (!actionsSettings)
            return;

        const { remainingCredits, creditCost } = actionsSettings.actionsCredits[playerAction.name];

        if (remainingCredits - creditCost < 0) {
            setQueue(oldQueue => skipNextAction(oldQueue));
            return;
        }

        setActionsSettings(prevState => ({
            ...prevState,
            actionsCredits: {
                ...prevState.actionsCredits,
                [playerAction.name]: {
                    ...prevState.actionsCredits[playerAction.name],
                    remainingCredits: prevState.actionsCredits[playerAction.name].remainingCredits - prevState.actionsCredits[playerAction.name].creditCost
                }
            }
        }));

        const computerAction: IAction = createComputerAction();
        const winner = whoWin(playerAction, computerAction);

        if (winner === 'player') setPlayerScore(playerScore + 1);
        else if (winner === 'computer') setComputerScore(computerScore + 1);

        setLastRound({ playerAction, computerAction, winner });
        popActionQueue();
    }

    useEffect(() => {
        if (queue) localStorage.setItem('shifumiQueue', JSON.stringify(queue));
    }, [queue]);

    useEffect(() => {
        if (playerScore !== null) localStorage.setItem('shifumiPlayerScore', JSON.stringify(playerScore));
    }, [playerScore]);

    useEffect(() => {
        if (computerScore !== null) localStorage.setItem('shifumiComputerScore', JSON.stringify(computerScore));
    }, [computerScore]);

    useEffect(() => {
        if (actionsSettings === null)
            return;

        localStorage.setItem('shifumiActionsSettings', JSON.stringify(actionsSettings));

        const dateDelay = getDateDelay(actionsSettings.nextRefresh);

        if (dateDelay <= 0) {
            timeoutId.current = null;
            setActionsSettings(computeActionsSettings(actionsSettings.nextRefresh));
        } else if (timeoutId?.current === null) {
            timeoutId.current = setTimeout(() => {
                timeoutId.current = null;
                setActionsSettings(computeActionsSettings());
            }, dateDelay);
        }
    }, [actionsSettings]);

    useEffect(() => {
        const newQueue = localStorage.getItem('shifumiQueue');
        const newPlayerScore = localStorage.getItem('shifumiPlayerScore');
        const newComputerScore = localStorage.getItem('shifumiComputerScore');
        const newActionsSettings = localStorage.getItem('shifumiActionsSettings');

        setQueue(newQueue ? JSON.parse(newQueue) : []);
        setPlayerScore(newPlayerScore ? JSON.parse(newPlayerScore) : 0);
        setComputerScore(newComputerScore ? JSON.parse(newComputerScore) : 0);
        setActionsSettings(newActionsSettings ? JSON.parse(newActionsSettings) : computeActionsSettings());
    }, []);

    return (
        <ActionsContext.Provider value={{
            addActionToQueue,
            queue,
            play,
            lastRound,
            computerScore,
            playerScore,
            actionsSettings
        }}>
            {
                (queue && playerScore !== null && computerScore !== null && actionsSettings !== null) ?
                    children
                    :
                    null
            }
        </ActionsContext.Provider>
    );
}
