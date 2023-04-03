import { useContext } from 'react';
import ActionsContext from '../../context/actions/ActionsContext';
import DeckAction from '../DeckAction/DeckAction';
import Text from '../Text/Text';
import styles from './Playground.module.scss';

type PlaygroundProps = {
    style?: (React.CSSProperties & object) | undefined;
};

function Playground({
    style = {},
}: PlaygroundProps) {
    const { lastRound, queue } = useContext(ActionsContext);

	return (
		<div
			className={styles.container}
            style={style}
        >
            {!queue?.length && !lastRound ?
                <Text variant='subtitle'>Ajoutez une carte à votre deck pour commencer un round</Text>
            :
                lastRound ?
                    <>
                        <div className={styles.gameContainer}>
                            <DeckAction subtitle='Ordinateur' big action={lastRound.computerAction} />
                            <Text className={styles.versusText} variant='title'>VS</Text>
                            <DeckAction subtitle='Vous' big action={lastRound.playerAction} />
                        </div>
                        <Text variant='title' color='purple'>{lastRound.winner === 'player' ? 'Gagné !' : (lastRound.winner === 'computer' ? 'Perdu !' : 'Égalité')}</Text>
                    </>
                :
                null
            }
		</div>
	);
}

export default Playground;