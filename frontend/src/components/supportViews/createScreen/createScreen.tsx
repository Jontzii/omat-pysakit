import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AppHeader from '../header';

import StopSelectionInformation from './stopSelectionInformation';
import StopSelection from './stopSelection';

import StopData from '../../../types/stopData';
import ScreenPost from '../../../types/screenPost';

import { getStops } from '../../../services/stopsService';
import { postScreen } from '../../../services/screenService';

const CreateScreen = () => {
    document.title = 'Omat Pysäkit - Luo näyttö';

    const [stops, setStops] = useState<StopData[] | null>(null);
    const [selectedStops, setSelected] = useState<StopData[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStops();
    }, []);

    const fetchStops = async () => {
        try {
            const data = await getStops();
            setStops(data);
        } catch {
            console.error('Could not fetch stops');
            setStops(null);
        }
    };

    const handlePost = async () => {
        // Form data
        if (!selectedStops) return false;

        const data: ScreenPost = {
            stops: selectedStops.map((val) => val.gtfsId),
            languages: ['fi']
        };

        try {
            // Create the screen
            const response = await postScreen(data);

            // Forward the user to created screen
            navigate(`/screen?id=${response.uuid}`);
        } catch {
            return false;
        }
    };

    return (
        <div
            className="
                bg-nysse-blue-light min-h-screen max-w-screen
                overflow-x-hidden overflow-y-auto
                "
        >
            <AppHeader />
            <main className="hidden md:flex flex-row w-screen max-h-screen text-clear-white my-5">
                <div className="w-7/12">
                    <StopSelectionInformation />
                </div>
                <div className="w-5/12">
                    <StopSelection
                        stops={stops}
                        selectedStops={selectedStops}
                        setSelected={setSelected}
                        setStops={setStops}
                        handlePost={handlePost}
                    />
                </div>
            </main>
            <main className="flex md:hidden flex-col w-screen max-h-screen text-clear-white my-5">
                <div className="p-4">
                    <StopSelectionInformation />
                </div>
                <div className="p-4">
                    <StopSelection
                        stops={stops}
                        selectedStops={selectedStops}
                        setSelected={setSelected}
                        setStops={setStops}
                        handlePost={handlePost}
                    />
                </div>
            </main>
        </div>
    );
};

export default CreateScreen;
