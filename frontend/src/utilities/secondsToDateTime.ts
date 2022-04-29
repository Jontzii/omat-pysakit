import { DateTime } from 'luxon';

const secondsToDateTime = (input: number): DateTime => {
    if (input < 0) {
        throw new Error('Input value should be larger than zero');
    }

    const timeAtMidnight = DateTime.fromObject({
        hour: 0,
        minute: 0,
        second: 0
    });
    const total = timeAtMidnight.toMillis() + input * 1000;
    return DateTime.fromMillis(total);
};

export default secondsToDateTime;
