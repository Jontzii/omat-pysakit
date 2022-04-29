type StopTimesData = {
    scheduledDeparture: number;
    realtimeDeparture: number;
    headsign: string;
    trip: TripData;
};

type TripData = {
    gtfsId: string;
    routeShortName: string;
};

export default StopTimesData;
