import { PropsWithChildren, useEffect, useState } from 'react';
import LoadingLottie from '../../components/Lottie/LoadingLottie';
import actionLifetime from '../../data/actionLifeTime';
import actionNames from '../../interfaces/actionNames';
import IAction from '../../interfaces/IAction';
import ActionsContext from './ActionsContext';

export default function ActionsProvider({
    children
}: PropsWithChildren) {
    const [queue, setQueue] = useState<IAction[] | null>(null);

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

    useEffect(() => {
        if (!queue)
            return;

        localStorage.setItem('shifumiQueue', JSON.stringify(queue));
    }, [queue]);

    useEffect(() => {
        if (queue)
            return;

        const newQueue = localStorage.getItem('shifumiQueue');

        if (!newQueue) {
            setQueue([]);
            return;
        }

        setQueue(JSON.parse(newQueue));
    }, []);

    return (
        <ActionsContext.Provider value={{
            addActionToQueue,
            popActionQueue,
            queue
        }}>
            {
                queue ?
                    children
                    :
                    <LoadingLottie />
            }
        </ActionsContext.Provider>
    );
}
