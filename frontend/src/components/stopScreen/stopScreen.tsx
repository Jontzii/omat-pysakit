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

    return (
        <div className="w-screen h-screen bg-nysse-blue-light">
            {isLoading && <PageSpinner />}
            {!isLoading && notFound && <NotFound />}
            {!isLoading && !notFound && <StopList />}
        </div>
    );
};

export default StopScreen;
