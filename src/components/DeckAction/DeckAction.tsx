import Text from '../Text/Text';
import styles from './DeckAction.module.scss';
import IAction from '../../interfaces/IAction';
import translateActionName from '../../utils/actionsTranslations';

type DeckActionProps = {
    style?: (React.CSSProperties & object) | undefined;
    action: IAction;
    big?: boolean;
    subtitle?: string;
};

const emojis = {
    rock: '✊',
    leaf: '✋',
    scissors: '✌️'
}

function DeckAction({
    style = {},
    action,
    big = false,
    subtitle
}: DeckActionProps) {
    const containerStyle = big ?
        {
            width: '15rem',
            height: '15rem',
            ...style
        }
    :
        {
            width: '6rem',
            height: '6rem',
            ...style
        }
    ;

	return (
		<div
			className={styles.container}
            style={containerStyle}
        >
            <Text variant={big ? 'title' : 'subtitle'}>{emojis[action.name]}</Text>
            <Text variant={big ? 'title' : 'bodyAccent'}>{translateActionName(action.name)}</Text>
            <Text>{subtitle}</Text>
		</div>
	);
}

export default DeckAction;