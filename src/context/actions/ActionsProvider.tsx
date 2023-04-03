import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import LoadingLottie from '../../components/Lottie/LoadingLottie';
import actionLifetime from '../../data/actionLifeTime';
import actionTypes from '../../data/actionTypes';
import IAction from '../../interfaces/IAction';
import IActionsSettings from '../../interfaces/IActionsSettings';
import IRound from '../../interfaces/IRound';
import computeActionsSettings from '../../utils/actionsSettings';
import { whoWin } from '../../utils/game';
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

    const addActionToQueue = (name: typeof actionTypes[number]) => {
        if (!queue)
            return;

        const newDate = queue.length ? new Date(queue[queue.length - 1].launchDate) : new Date();
        newDate.setTime(newDate.getTime() + actionLifetime);

        const newAction: IAction = {
            name,
            launchDate: newDate.toISOString()
        }

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
        if (!actionsSettings || actionsSettings.actionsCredits[playerAction.name].remainingCredits <= 0)
            return;

        setActionsSettings(prevState => ({
            ...prevState,
            actionsCredits: {
                ...prevState.actionsCredits,
                [playerAction.name]: {
                    ...prevState.actionsCredits[playerAction.name],
                    remainingCredits: prevState.actionsCredits[playerAction.name].remainingCredits - 1
                }
            }
        }));

        const computerSign = actionTypes[Math.floor(Math.random() * 3)];

        const computerAction: IAction = {
            name: computerSign,
            launchDate: playerAction.launchDate
        };
        const winner = whoWin(playerAction, computerAction);

        if (winner === 'player') setPlayerScore(playerScore + 1);
        else if (winner === 'computer') setComputerScore(computerScore + 1);

        setLastRound({ playerAction, computerAction, winner });
    }

    useEffect(() => {
        if (!queue)
            return;

        localStorage.setItem('shifumiQueue', JSON.stringify(queue));
    }, [queue]);

    useEffect(() => {
        if (playerScore === null)
            return;

        localStorage.setItem('shifumiPlayerScore', JSON.stringify(playerScore));
    }, [playerScore]);

    useEffect(() => {
        if (computerScore === null)
            return;

        localStorage.setItem('shifumiComputerScore', JSON.stringify(computerScore));
    }, [computerScore]);

    useEffect(() => {
        if (actionsSettings === null)
            return;

        localStorage.setItem('shifumiActionsSettings', JSON.stringify(actionsSettings));

        const currentDate = new Date();
        const nextRefreshDate = new Date(actionsSettings.nextRefresh);

        const currentDateValue = currentDate.getTime();
        const nextRefreshDateValue = nextRefreshDate.getTime();

        if (nextRefreshDateValue <= currentDateValue) {
            timeoutId.current = null;
            setActionsSettings(computeActionsSettings(actionsSettings.nextRefresh));
        } else if (timeoutId?.current === null) {
            timeoutId.current = setTimeout(() => {
                timeoutId.current = null;
                setActionsSettings(computeActionsSettings());
            }, nextRefreshDateValue - currentDateValue);
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
            popActionQueue,
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
                    <LoadingLottie />
            }
        </ActionsContext.Provider>
    );
}
