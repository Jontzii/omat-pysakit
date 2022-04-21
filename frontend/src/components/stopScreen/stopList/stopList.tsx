import React from 'react';
import _ from 'lodash';
import StopWithTimeData, {
    StopWithSingleTimeData
} from '../../../types/StopWithTimeData';
import StopItem from './stopItem';
import secondsToDateTime from '../../../utilities/secondsToDateTime';

interface StopListProps {
    stops: StopWithTimeData[];
}

const StopList = ({ stops }: StopListProps) => {
    const newStops: StopWithSingleTimeData[] = [];

    _.forEach(stops, (stop) => {
        _.forEach(stop.stoptimesWithoutPatterns, (times) => {
            const stopToAdd: StopWithSingleTimeData = {
                gtfsId: stop.gtfsId,
                name: stop.name,
                code: stop.code,
                vehicleMode: stop.vehicleMode,
                routeShortName: times.trip.routeShortName,
                scheduledDeparture: times.scheduledDeparture,
                scheduledDepartureDT: secondsToDateTime(
                    times.scheduledDeparture
                ),
                realtimeDeparture: times.realtimeDeparture,
                realtimeDepartureDT: secondsToDateTime(times.realtimeDeparture),
                headsign: times.headsign,
                tripGtfsId: times.trip.gtfsId
            };

            newStops.push(stopToAdd);
        });
    });

    const sorted = _.sortBy(newStops, ['realtimeDeparture']);
    const stopItems = _.map(sorted, (stop) => StopItem({ stop }));

    return (
        <div className="text-2xl text-clear-white flex flex-col items-center pt-2 pb-2">
            {stopItems}
        </div>
    );
};

export default StopList;
