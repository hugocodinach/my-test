import { useContext, useState } from 'react';
import ActionsContext from '../../context/actions/ActionsContext';
import { useInterval } from '../../hooks/useInterval';
import { isThereANextRound } from '../../utils/game';
import Text from '../Text/Text';

function Chronometer() {
    const { queue } = useContext(ActionsContext);

    const [secondsInterval, setSecondsInterval] = useState(-1);

    useInterval(() => {
        if (!isThereANextRound(queue)) {
            if (secondsInterval !== -1)
                setSecondsInterval(-1);
            return;
        }

        const currentDate = new Date();
        const nextActionDate = new Date(queue[0].launchDate);

        const currentDateValue = currentDate.getTime();
        const nextActionDateValue = nextActionDate.getTime();

        setSecondsInterval(Math.floor((nextActionDateValue - currentDateValue) / 1000));
    }, 1000);

    if (secondsInterval < 0)
        return null;

    const minutes = Math.floor(secondsInterval / 60) % 60;
    const seconds = (secondsInterval - minutes * 60) % 60;

	return (
        <Text>Prochain round dans {minutes}m{seconds < 10 ? `0${seconds}` : seconds}</Text>
    );
}

export default Chronometer;