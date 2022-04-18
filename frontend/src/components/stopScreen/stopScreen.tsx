/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ScreenHeader from './header/header';
import PageSpinner from '../uiElements/pageSpinner';
import NotFound from './notFound';

import ScreenSettings from '../../types/screenSettings';
import { getScreen } from '../../services/screenService';
import StopList from './stopList/stopList';

const StopScreen = () => {
    document.title = 'Omat Pysäkit';

    const searchParams = useSearchParams()[0];
    const [stops, setStops] = useState<string[] | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const uuid = searchParams.get('id');

    const fetchScreen = useCallback(async () => {
        try {
            if (!uuid) throw new Error();

            const data: ScreenSettings = await getScreen(uuid);

            setStops(data.stops);
            setLoading(false);
        } catch {
            setTimeout(() => {
                setLoading(false);
                setNotFound(true);
            }, 1000);
        }
    }, [uuid]);

    useEffect(() => {
        fetchScreen();
    }, [fetchScreen]);

    if (isLoading) {
        return (
            <div className="w-screen h-screen bg-nysse-blue-light">
                <PageSpinner />
            </div>
        );
    } else if (!isLoading && (notFound || !stops)) {
        return (
            <div className="w-screen h-screen bg-nysse-blue-light">
                <NotFound />
            </div>
        );
    }

    return (
        <div className="w-screen h-screen bg-nysse-blue-light">
            <ScreenHeader stops={stops || []} />
            <StopList stops={stops} />
        </div>
    );
};

export default StopScreen;
