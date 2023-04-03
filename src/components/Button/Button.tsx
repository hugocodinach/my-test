import { useCallback, useState } from 'react';
import Text from '../Text/Text';

import styles from './Button.module.scss';

type ButtonProps = {
    style?: (React.CSSProperties & object) | undefined;
    text: string;
    onClick?: () => void;
};

function Button({
    style = {},
    text,
    onClick
}: ButtonProps) {
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = useCallback(() => setIsHover(true), []);
    const handleMouseLeave = useCallback(() => setIsHover(false), []);

	return (
		<button
			style={style}
			className={styles.container}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            <Text color={isHover ? 'text' : 'white'} variant='button'>{text}</Text>
		</button>
	);
}

export default Button;