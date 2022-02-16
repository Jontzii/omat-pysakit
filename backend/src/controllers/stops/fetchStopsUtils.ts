import { DateTime } from 'luxon';
import _ from 'lodash';

import Logger from '@utils/logger';
import fetchData from './fetchData';

const { DIGITRANSIT_AREA } = process.env;

// Keep stops at memory
export const STOPS: { stops: string[]; validUntil: string | null } = {
    stops: [],
    validUntil: null
};

/**
 * Return stops from memory or fetch them from the API
 * @returns
 */
export const getStops = async (): Promise<string[]> => {
    const currentTime = DateTime.now().toUTC();

    if (STOPS.validUntil) {
        const validUntil = DateTime.fromISO(STOPS.validUntil).toUTC();

        if (validUntil > currentTime) {
            return STOPS.stops;
        }
    }

    Logger.info('Stops are no longer valid, fetch again');

    const stops = await fetchData();
    const stopsParsed = _.map(stops, (stop) => stop.gtfsId);

    STOPS.stops = stopsParsed;
    STOPS.validUntil = currentTime.plus({ hours: 1 }).toISO();

    Logger.info(
        `Fetched ${stopsParsed.length} stops from the API for the are ${DIGITRANSIT_AREA}`
    );

    return stopsParsed;
};

/**
 * FOR TESTING USE ONLY!
 * @param value
 */
export const setStops = (value: { stops: string[]; validUntil: string }) => {
    STOPS.stops = value.stops;
    STOPS.validUntil = value.validUntil;
};
