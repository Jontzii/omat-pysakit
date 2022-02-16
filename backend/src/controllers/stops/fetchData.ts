import axios from 'axios';
import stopObject from '@definitions/stopObject';
import Logger from '@utils/logger';

const { DIGITRANSIT_URL, DIGITRANSIT_AREA } = process.env;

/**
 * Fetch stops in the area from the DigiTransit GraphQL API
 * @returns
 */
const fetchData = async (): Promise<stopObject[]> => {
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
        Logger.error('Failed to fetch stops from Digitransit');
        return [];
    }
};

export default fetchData;
