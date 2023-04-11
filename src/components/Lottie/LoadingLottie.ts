// Imports
import { useLottie } from "lottie-react";

// Assets
import * as animationData from './loading.json';

function LoadingLottie() {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData
	};

	const { View } = useLottie(defaultOptions, { width: '30%' });

	return View;
}

export default LoadingLottie;