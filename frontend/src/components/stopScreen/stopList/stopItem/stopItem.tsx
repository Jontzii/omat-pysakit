import React from 'react';
import { StopWithSingleTimeData } from '../../../../types/StopWithTimeData';
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
            className="rounded border-2 border-clear-white w-11/12 m-1"
        >
            <div className="hidden md:flex items-center h-24">
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
            <div className="flex md:hidden items-center h-20">
                <div className="w-8/12 text-center">
                    <p className="text-base">Pysäkki</p>
                    <h1 className="text-3xl">{stop.name}</h1>
                </div>
                <div className="w-1/12 text-center">
                    <p className="text-base">Linja</p>
                    <h1 className="text-3xl">{stop.routeShortName}</h1>
                </div>
                <div className="w-3/12 text-center">
                    <p className="text-base">Lähtöaika</p>
                    <h1 className="text-3xl">{time}</h1>
                </div>
            </div>
        </div>
    );
};

export default StopItem;
