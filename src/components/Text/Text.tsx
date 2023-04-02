import { PropsWithChildren } from 'react';
import { IColors, ITypographies } from '../../styles/Theme/themeInterfaces';
import theme from '../../styles/Theme/theme';

type TextProps = {
    color?: keyof IColors;
    variant?: keyof ITypographies;
    style?: (React.CSSProperties & object) | undefined;
    className?: string;
};

function Text({
    style,
    children,
    variant = 'body',
    color = 'text',
    className,
}: PropsWithChildren<TextProps>) {
	const { typography, colors } = theme;

	const currentTypo = typography[variant];

	const finalStyle = {
		fontSize: currentTypo.fontSize,
        fontWeight: currentTypo.fontWeight,
		color: colors[color],
		...style
	};

	return (
		<span
			style={finalStyle}
			className={className}>
			{children}
		</span>
	);
}

export default Text;