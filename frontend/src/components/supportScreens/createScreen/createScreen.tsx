import React, { useEffect, useState } from 'react';
import AppHeader from '../header';

import StopSelectionInformation from './stopSelectionInformation';
import StopSelection from './stopSelection';

import StopData from '../../../types/stopData';
import { getStops } from '../../../services/stopsService';

const CreateScreen = () => {
    document.title = 'Omat Pysäkit - Luo näyttö';

    const [stops, setStops] = useState<StopData[] | null>(null);
    const [selectedStops, setSelected] = useState<StopData[] | null>(null);

    useEffect(() => {
        getStops()
            .then((data) => setStops(data))
            .catch(() => console.error('Could not fetch stops'));
    }, []);

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
                    />
                </div>
            </main>
        </div>
    );
};

export default CreateScreen;
