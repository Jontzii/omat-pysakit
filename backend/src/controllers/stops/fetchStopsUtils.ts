import { DateTime } from 'luxon';

import Logger from '@utils/logger';
import fetchData from './fetchData';
import stopObject from '@definitions/stopObject';

const { DIGITRANSIT_AREA } = process.env;

// Keep stops at memory
export const STOPS: { stops: stopObject[]; validUntil: string | null } = {
    stops: [],
    validUntil: null
};

/**
 * Return stops from memory or fetch them from the API
 * @returns
 */
export const getStops = async (): Promise<stopObject[]> => {
    const currentTime = DateTime.now().toUTC();

    if (STOPS.validUntil) {
        const validUntil = DateTime.fromISO(STOPS.validUntil).toUTC();

        if (validUntil > currentTime) {
            return STOPS.stops;
        }
    }

    Logger.info('Stops are no longer valid, fetch again');

    const stops = await fetchData();

    STOPS.stops = stops;
    STOPS.validUntil = currentTime.plus({ hours: 1 }).toISO();

    Logger.info(
        `Fetched ${stops.length} stops from the API for the area ${DIGITRANSIT_AREA}`
    );

    return stops;
};

/**
 * FOR TESTING USE ONLY!
 * @param value
 */
export const setStops = (value: {
    stops: stopObject[];
    validUntil: string;
}) => {
    STOPS.stops = value.stops;
    STOPS.validUntil = value.validUntil;
};
