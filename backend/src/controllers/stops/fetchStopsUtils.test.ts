import { DateTime } from 'luxon';
import { setStops, getStops } from './fetchStopsUtils';
import fetchData from './fetchData';
import { mocked } from 'jest-mock';

jest.mock('@utils/logger');
jest.mock('./fetchData');
const mockedFetchData = mocked(fetchData, true);

describe('fetchStopsUtils', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('getStops', () => {
        test('Should return from STOPS if valid', async () => {
            setStops({
                stops: ['test:3000', 'test:3001'],
                validUntil: DateTime.now().toUTC().plus({ hours: 1 }).toISO()
            });

            const stops = await getStops();

            expect(stops).toEqual(['test:3000', 'test:3001']);
        });

        test('Should fetch from API if not valid', async () => {
            setStops({
                stops: ['test:3000', 'test:3001'],
                validUntil: DateTime.now().toUTC().minus({ hours: 1 }).toISO()
            });

            mockedFetchData.mockResolvedValueOnce([
                {
                    gtfsId: 'test:4000',
                    name: 'test',
                    code: '4000'
                }
            ]);

            const stops = await getStops();

            expect(stops).toEqual(['test:4000']);
        });
    });
});
