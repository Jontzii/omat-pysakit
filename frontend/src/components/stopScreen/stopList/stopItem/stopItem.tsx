import React from 'react';
import { StopWithSingleTimeData } from '../../../../types/StopWithTimeData';
import _ from 'lodash';
import { DateTime } from 'luxon';

interface StopItemProps {
    stop: StopWithSingleTimeData;
}

const StopItem = ({ stop }: StopItemProps) => {
    const time = stop.realtimeDepartureDT.toLocaleString(
        DateTime.TIME_24_SIMPLE
    );

    return (
        <div
            key={`stopitem-${stop.scheduledDeparture}-${stop.gtfsId}-${stop.routeShortName}`}
            className="flex rounded border-2 border-clear-white w-11/12 h-24 m-1 items-center"
        >
            <div className="w-4/12 text-center">
                <p className="text-base">Pysäkki</p>
                <h1 className="text-4xl">{stop.name}</h1>
            </div>
            <div className="w-2/12 text-center">
                <p className="text-base">Linja</p>
                <h1 className="text-4xl">{stop.routeShortName}</h1>
            </div>
            <div className="w-4/12 text-center">
                <p className="text-base">Määränpää</p>
                <h1 className="text-4xl">{stop.headsign}</h1>
            </div>
            <div className="w-2/12 text-center">
                <p className="text-base">Lähtöaika</p>
                <h1 className="text-4xl">{time}</h1>
            </div>
        </div>
    );
};

export default StopItem;
