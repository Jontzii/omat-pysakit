import { DateTime } from 'luxon';

const secondsToDateTime = (input: number): DateTime => {
    const timeAtMidnight = DateTime.fromObject({
        hour: 0,
        minute: 0,
        second: 0
    });
    const total = timeAtMidnight.toMillis() + input * 1000;
    return DateTime.fromMillis(total);
};

export default secondsToDateTime;
