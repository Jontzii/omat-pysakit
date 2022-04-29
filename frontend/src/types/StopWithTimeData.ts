import { DateTime } from 'luxon';
import StopTimesData from './stopTimesData';

type StopWithTimeData = {
    gtfsId: string;
    name: string;
    code: string;
    vehicleMode: string;
    stoptimesWithoutPatterns: StopTimesData[];
};

export type StopWithSingleTimeData = {
    gtfsId: string;
    name: string;
    code: string;
    routeShortName: string;
    vehicleMode: string;
    scheduledDeparture: number;
    scheduledDepartureDT: DateTime;
    realtimeDeparture: number;
    realtimeDepartureDT: DateTime;
    headsign: string;
    tripGtfsId: string;
};

export default StopWithTimeData;
