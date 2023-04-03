import { useContext, useEffect, useRef } from 'react';
import Button from '../../components/Button/Button';
import Chronometer from '../../components/Chronometer/Chronometer';
import DeckAction from '../../components/DeckAction/DeckAction';
import Playground from '../../components/Playground/Playground';
import Text from '../../components/Text/Text';
import ActionsContext from '../../context/actions/ActionsContext';
import actionTypes from '../../data/actionTypes';
import IAction from '../../interfaces/IAction';
import getTranslatedActionName from '../../utils/actionsTranslations';
import { getDateDelay } from '../../utils/date';
import styles from './HomePage.module.scss';

function HomePage() {
    const { addActionToQueue, queue, play, actionsSettings, playerScore, computerScore } = useContext(ActionsContext);

    const timeoutId = useRef(null);

    const executeAction = (action: IAction) => {
        timeoutId.current = null;

        play(action);
    }

    useEffect(() => {
        if (!queue?.length || timeoutId?.current)
            return;

        const delay = getDateDelay(queue[0].launchDate);

        if (delay <= 0) {
            executeAction(queue[0]);
        } else {
            timeoutId.current = setTimeout(() => {
                executeAction(queue[0]);
            }, delay);
        }
    }, [queue]);

	return (
		<div className={styles.container}>
            <div className={styles.gameContainer}>
                <Text variant='title'>Ordinateur {computerScore} - Vous {playerScore}</Text>
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
                        actionTypes.map(action => (
                            <Button
                                key={action}
                                onClick={() => addActionToQueue(action)}
                                text={`${getTranslatedActionName(action)} (${actionsSettings.actionsCredits[action].remainingCredits} cdt)`}
                            />
                        ))
                    }
                </div>
            </div>
		</div>
	);
}

export default HomePage;
