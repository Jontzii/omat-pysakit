import secondsToDateTime from './secondsToDateTime';

describe('secondsToDateTime', () => {
    test('Seconds to datetime #1', () => {
        const seconds = 63360; // 17:36
        const res = secondsToDateTime(seconds);

        expect(res.hour).toEqual(17);
        expect(res.minute).toEqual(36);
    });

    test('Seconds to datetime #2', () => {
        const seconds = 42180; // 11:43
        const res = secondsToDateTime(seconds);

        expect(res.hour).toEqual(11);
        expect(res.minute).toEqual(43);
    });

    test('Seconds to datetime #3', () => {
        const seconds = 15060; // 04:11
        const res = secondsToDateTime(seconds);

        expect(res.hour).toEqual(4);
        expect(res.minute).toEqual(11);
    });

    test('Negative value', () => {
        const seconds = -3600;
        expect(() => secondsToDateTime(seconds)).toThrow(
            'Input value should be larger than zero'
        );
    });
});
