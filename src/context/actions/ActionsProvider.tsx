import { PropsWithChildren, useEffect, useState } from 'react';
import LoadingLottie from '../../components/Lottie/LoadingLottie';
import actionLifetime from '../../data/actionLifeTime';
import actionNames from '../../interfaces/actionNames';
import IAction from '../../interfaces/IAction';
import IRound from '../../interfaces/IRound';
import { whoWin } from '../../utils/game';
import ActionsContext from './ActionsContext';

export default function ActionsProvider({
    children
}: PropsWithChildren) {
    const [queue, setQueue] = useState<IAction[] | null>(null);
    const [playerScore, setPlayerScore] = useState<number | null>(null);
    const [computerScore, setComputerScore] = useState<number | null>(null);
    const [lastRound, setLastRound] = useState<IRound | null>(null);

    const addActionToQueue = (name: typeof actionNames[number]) => {
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
        const computerSign = actionNames[Math.floor(Math.random() * 3)];
        console.log('computerSign: ', computerSign);

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
        if (queue)
            return;

        const newQueue = localStorage.getItem('shifumiQueue');
        const newPlayerScore = localStorage.getItem('shifumiPlayerScore');
        const newComputerScore = localStorage.getItem('shifumiComputerScore');

        setQueue(newQueue ? JSON.parse(newQueue) : []);
        setPlayerScore(newPlayerScore ? JSON.parse(newPlayerScore) : 0);
        setComputerScore(newComputerScore ? JSON.parse(newComputerScore) : 0);
    }, []);

    return (
        <ActionsContext.Provider value={{
            addActionToQueue,
            popActionQueue,
            queue,
            play,
            lastRound,
            computerScore,
            playerScore
        }}>
            {
                (queue && playerScore !== null && computerScore !== null) ?
                    children
                    :
                    <LoadingLottie />
            }
        </ActionsContext.Provider>
    );
}
