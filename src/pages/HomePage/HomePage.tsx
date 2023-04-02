import { useContext, useEffect, useRef } from 'react';
import Button from '../../components/Button/Button';
import Chronometer from '../../components/Chronometer/Chronometer';
import DeckAction from '../../components/DeckAction/DeckAction';
import Playground from '../../components/Playground/Playground';
import Text from '../../components/Text/Text';
import ActionsContext from '../../context/actions/ActionsContext';
import actionNames from '../../interfaces/actionNames';
import IAction from '../../interfaces/IAction';
import styles from './HomePage.module.scss';

function HomePage() {
    const { addActionToQueue, popActionQueue, queue, play } = useContext(ActionsContext);

    const timeoutId = useRef(null);

    const executeAction = (action: IAction) => {
        timeoutId.current = null;

        play(action);
        popActionQueue();
    }

    useEffect(() => {
        if (!queue?.length || timeoutId?.current)
            return;

        const currentDate = new Date();
        const nextActionDate = new Date(queue[0].launchDate);

        const currentDateValue = currentDate.getTime();
        const nextActionDateValue = nextActionDate.getTime();

        if (nextActionDateValue <= currentDateValue) {
            executeAction(queue[0]);
        } else {
            timeoutId.current = setTimeout(() => {
                executeAction(queue[0]);
            }, nextActionDateValue - currentDateValue);
        }
    }, [queue]);

	return (
		<div className={styles.container}>
            <div className={styles.gameContainer}>
                <Text variant='title'>Round</Text>
                <Chronometer />
                <div className={styles.playgroundContainer}>
                    <Playground />
                </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.deckContainer}>
                <Text variant='subtitle'>Votre deck</Text>
                <div className={styles.decksContainer}>
                    {queue?.map((action, key) => <DeckAction key={key} action={action} />)}
                </div>
                <div className={styles.actionContainer}>
                    {
                        actionNames.map(action => (
                            <Button key={action} onClick={() => addActionToQueue(action)} text={action} />
                        ))
                    }
                </div>
            </div>
		</div>
	);
}

export default HomePage;
