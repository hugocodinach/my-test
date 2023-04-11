// Imports
import PropTypes from 'prop-types';
import theme from '../../styles/Theme/theme';
import TSnackbar from '../../types/TSnackbar';
import Text from '../Text/Text';

import styles from './Snackbar.module.scss';

type SnackbarProps = {
    style?: (React.CSSProperties & object) | undefined;
    onClick?: (id: string) => void;
	snackbar: TSnackbar;
};

function Snackbar({
	style,
	onClick,
	snackbar
}: SnackbarProps) {
	const { type, text, id } = snackbar;
	const { colors } = theme;

	return (
		<div
			style={{ ...style, background: type === 'success' ? colors.purple : colors.error }}
			className={styles.container}
			onClick={() => onClick(id)}
		>
			<Text variant='bodyAccent' color='white'>{text}</Text>
		</div>
	);
}

Snackbar.propTypes = {
	style: PropTypes.object,
	type: PropTypes.string,
	text: PropTypes.string,
	id: PropTypes.string,
	onClick: PropTypes.func
};

Snackbar.defaultProps = {
	style: {},
	type: 'info',
	text: '',
	id: '',
	onClick: () => {}
};

export default Snackbar;