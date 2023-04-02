import Text from '../Text/Text';
import styles from './DeckAction.module.scss';
import IAction from '../../interfaces/IAction';

type TextProps = {
    style?: (React.CSSProperties & object) | undefined;
    action: IAction
};

const emojis = {
    Pierre: '✊',
    Feuille: '✋',
    Ciseaux: '✌️'
}

function DeckAction({
    style = {},
    action
}: TextProps) {

	return (
		<div
			className={styles.container}
            style={style}
        >
            <Text variant='subtitle'>{emojis[action.name]}</Text>
            <Text variant='bodyAccent'>{action.name}</Text>
		</div>
	);
}

export default DeckAction;