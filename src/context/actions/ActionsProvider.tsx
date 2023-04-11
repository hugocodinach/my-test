import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useApi } from '../../hooks/useApi';

import IAction from '../../interfaces/IAction';
import IActionsSettings from '../../interfaces/IActionsSettings';
import IRound from '../../interfaces/IRound';
import TActionName from '../../types/TActionName';

import { createNewActionFromName } from '../../utils/actionsManagement';
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

    const getQueue = useApi('get', '/queue');
    const getScore = useApi('get', '/score');
    const getSettings = useApi('get', '/settings');
    const postAction = useApi('post', '/queue/action');
    const putScore = useApi('put', '/score');
    const putSettingsCredits = useApi('put', '/settings/actionsCredits');
    const putNextRefresh = useApi('put', '/settings/nextRefresh');
    const delAction = useApi('del', `/queue/action/${queue && queue[0] ? queue[0]._id : ''}`);
    const skipAction = useApi('del', `/queue/action/${queue && queue[0] ? queue[0]._id : ''}?skip=true`);

    const timeoutId = useRef(null);

    const addActionToQueue = async (name: TActionName) => {
        if (!queue)
            return;

        const newAction: IAction = createNewActionFromName(queue, name);

        const res = await postAction.call(newAction);

        if (!res)
            return;

        const newQueue = await getQueue.call();

        if (!newQueue)
            return;

        setQueue(newQueue);
    }

    const play = async (playerAction: IAction) => {
        if (!actionsSettings)
            return;

        const { remainingCredits, creditCost } = actionsSettings.actionsCredits[playerAction.name];

        if (remainingCredits - creditCost < 0) {
            const delActionRes = await skipAction.call();

            if (!delActionRes)
                return;

            const newQueue = await getQueue.call();
        
            if (newQueue) setQueue(newQueue);
            return;
        }

        const putSettingsCreditRes = await putSettingsCredits.call({
            actionsCredits: {
                ...actionsSettings.actionsCredits,
                [playerAction.name]: {
                    ...actionsSettings.actionsCredits[playerAction.name],
                    remainingCredits: actionsSettings.actionsCredits[playerAction.name].remainingCredits - actionsSettings.actionsCredits[playerAction.name].creditCost
                }
            }
        });

        if (!putSettingsCreditRes)
            return;

        const newSettings = await getSettings.call();

        if (!newSettings)
            return;

        setActionsSettings({
            nextRefresh: newSettings.nextRefresh,
            actionsCredits: newSettings.actionsCredits
        });

        const computerAction: IAction = createComputerAction();
        const winner = whoWin(playerAction, computerAction);

        const res = await putScore.call({
            playerScore: winner === 'player' ? playerScore + 1 : playerScore,
            computerScore: winner === 'computer' ? computerScore + 1 : computerScore
        });

        if (!res)
            return;

        const newScore = await getScore.call();

        if (!newScore)
            return;

        setPlayerScore(newScore.playerScore);
        setComputerScore(newScore.computerScore);

        setLastRound({ playerAction, computerAction, winner });

        const delActionRes = await delAction.call();

        if (!delActionRes)
            return;

        const newQueue = await getQueue.call();
    
        if (newQueue) setQueue(newQueue);
    }

    const handleRefresh = async () => {
        const res = await putNextRefresh.call();

        if (!res)
            return;

        const newSettings = await getSettings.call();

        if (!newSettings)
            return;

        setActionsSettings({
            nextRefresh: newSettings.nextRefresh,
            actionsCredits: newSettings.actionsCredits
        });
    }

    useEffect(() => {
        if (actionsSettings === null)
            return;

        const dateDelay = getDateDelay(actionsSettings.nextRefresh);

        if (dateDelay <= 0) {
            timeoutId.current = null;
            handleRefresh();
        } else if (timeoutId?.current === null) {
            timeoutId.current = setTimeout(() => {
                timeoutId.current = null;
                handleRefresh();
            }, dateDelay);
        }
    }, [actionsSettings]);

    const init = async () => {
        const newQueue = await getQueue.call();
        const newScore = await getScore.call();
        const newSettings = await getSettings.call();

        if (newQueue) setQueue(newQueue);
        if (newScore) {
            setPlayerScore(newScore.playerScore);
            setComputerScore(newScore.computerScore);
        }
        if (newSettings) {
            setActionsSettings({
                nextRefresh: newSettings.nextRefresh,
                actionsCredits: newSettings.actionsCredits
            });
        }
    }

    useEffect(() => {
        init();
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
