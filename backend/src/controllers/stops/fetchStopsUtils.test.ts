import { DateTime } from 'luxon';
import { setStops, getStops } from './fetchStopsUtils';
import fetchData from './fetchData';
import { mocked } from 'jest-mock';
import stopObject from '@definitions/stopObject';

jest.mock('@utils/logger');
jest.mock('./fetchData');
const mockedFetchData = mocked(fetchData, true);

describe('fetchStopsUtils', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('getStops', () => {
        const stopObjects: stopObject[] = [
            {
                gtfsId: 'test:3001',
                name: 'first'
            },
            {
                gtfsId: 'test:3002',
                name: 'second'
            }
        ];

        test('Should return from STOPS if valid', async () => {
            setStops({
                stops: stopObjects,
                validUntil: DateTime.now().toUTC().plus({ hours: 1 }).toISO()
            });

            const stops = await getStops();

            expect(stops).toEqual(stopObjects);
        });

        test('Should fetch from API if not valid', async () => {
            setStops({
                stops: stopObjects,
                validUntil: DateTime.now().toUTC().minus({ hours: 1 }).toISO()
            });

            mockedFetchData.mockResolvedValueOnce(stopObjects);

            const stops = await getStops();

            expect(stops).toEqual(stopObjects);
        });
    });
});
