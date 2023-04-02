import { useLottie } from "lottie-react";
import * as animationData from './loading.json';

import styles from './LoadingLottie.module.scss';

function LoadingLottie() {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData
	};

	const { View } = useLottie(defaultOptions, { width: '20%' });

	return (
		<div className={styles.container}>
			{View}
		</div>
	);
}

export default LoadingLottie;