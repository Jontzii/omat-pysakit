/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import ScreenHeader from './header/header';
import PageSpinner from '../uiElements/pageSpinner';
import NotFound from './notFound';
import ApolloErrorView from './ApolloErrorView';

import StopWithTimeData from '../../types/StopWithTimeData';
import ScreenSettings from '../../types/screenSettings';
import { getScreen } from '../../services/screenService';
import StopList from './stopList/stopList';
import _ from 'lodash';

const StopScreen = () => {
    document.title = 'Omat Pysäkit';

    const searchParams = useSearchParams()[0];
    const [stops, setStops] = useState<string[] | null>(null);
    const [notFound, setNotFound] = useState(false);
    const uuid = searchParams.get('id');

    useEffect(() => {
        try {
            if (!uuid) throw new Error();

            getScreen(uuid)
                .then((res: ScreenSettings) => setStops(res.stops))
                .catch(() => {
                    setTimeout(() => {
                        setNotFound(true);
                    }, 1000);
                });
        } catch {
            setTimeout(() => {
                setNotFound(true);
            }, 1000);
        }
    }, [uuid]);

    const STOP_QUERY = gql`
        {
            stops(ids: ${JSON.stringify(stops)}) {
                    gtfsId,
                    name,
                    code,
                    vehicleMode,
                    stoptimesWithoutPatterns(numberOfDepartures: 5) {
                    scheduledDeparture,
                    realtimeDeparture,
                    headsign,
                    trip {
                        gtfsId,
                        routeShortName,
                    }
                }
            }
        }
    `;

    const { loading, error, data } = useQuery(STOP_QUERY);

    if (loading || !data || !data.stops || data.stops.length === 0) {
        return (
            <div className="w-screen h-screen bg-nysse-blue-light">
                <PageSpinner />
            </div>
        );
    } else if (notFound) {
        return (
            <div className="w-screen h-screen bg-nysse-blue-light">
                <NotFound />
            </div>
        );
    } else if (error) {
        return (
            <div className="w-screen h-screen bg-nysse-blue-light">
                <ApolloErrorView />
            </div>
        );
    }

    const stopData: StopWithTimeData[] = data.stops;

    return (
        <div className="max-w-screen min-h-screen bg-nysse-blue-light">
            <ScreenHeader stops={_.map(stopData, (val) => val.name)} />
            <StopList stops={stopData} />
            <div className="text-center text-clear-white pb-4">
                Made by Jontzii
            </div>
        </div>
    );
};

export default StopScreen;
