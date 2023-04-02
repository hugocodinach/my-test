import Text from '../../components/Text/Text';
import styles from './HomePage.module.scss';

function HomePage() {
	return (
		<div className={styles.container}>
            <div className={styles.gameContainer}>
                d
            </div>
            <div className={styles.deckContainer}>
                <Text variant='subtitle'>Votre deck</Text>
            </div>
		</div>
	);
}

export default HomePage;
