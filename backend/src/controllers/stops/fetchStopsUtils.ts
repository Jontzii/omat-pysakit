import axios from 'axios';
import { DateTime } from 'luxon';
import _ from 'lodash';

import stopObject from '../../types/stopObject';
import logger from '../../utils/logger';

const { DIGITRANSIT_URL, DIGITRANSIT_AREA } = process.env;

// Keep stops at memory
const STOPS: { stops: string[]; validUntil: string | null } = {
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

    logger.info('Stops are no longer valid, fetch again');

    const stops = await fetchData();
    const stopsParsed = _.map(stops, (stop) => stop.gtfsId);

    STOPS.stops = stopsParsed;
    STOPS.validUntil = currentTime.plus({ hours: 1 }).toISO();

    logger.info(
        `Fetched ${stopsParsed.length} stops from the API for the are ${DIGITRANSIT_AREA}`
    );

    return stopsParsed;
};

/**
 * Fetch stops in the area from the DigiTransit GraphQL API
 * @returns
 */
export const fetchData = async (): Promise<stopObject[]> => {
    try {
        const response = await axios({
            method: 'post',
            url: DIGITRANSIT_URL,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            data: {
                query: `{ stops(feeds: ["${DIGITRANSIT_AREA}"]) { gtfsId, name } }`
            }
        });

        const stops: stopObject[] = response.data.data.stops;
        return stops;
    } catch {
        logger.error('Failed to fetch stops from Digitransit');
        return [];
    }
};
