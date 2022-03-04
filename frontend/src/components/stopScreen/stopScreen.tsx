import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ScreenHeader from './header/header';
import PageSpinner from '../uiElements/pageSpinner';

import { getScreen } from '../../services/screenService';

const StopScreen = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [stops, setStops] = useState<string[] | null>(null);
    const [uuid, setUuid] = useState(searchParams.get('id'));
    const [isLoading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const fetchScreen = async () => {
        if (!uuid) return null;

        try {
            const data = await getScreen(uuid);
            setLoading(false);
        } catch {
            setLoading(false);
            setNotFound(true);
        }
    };

    useEffect(() => {
        fetchScreen();
    }, []);

    return (
        <div className="w-screen h-screen bg-nysse-blue-light">
            <PageSpinner />
        </div>
    );
};

export default StopScreen;
