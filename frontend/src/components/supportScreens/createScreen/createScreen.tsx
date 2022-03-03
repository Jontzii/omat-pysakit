import React from 'react';
import AppHeader from '../header';

import StopSelectionInformation from './stopSelectionInformation';
import StopSelection from './stopSelection';

const CreateScreen = () => {
    document.title = 'Omat Pysäkit - Luo näyttö';

    return (
        <div className="bg-nysse-blue-light min-h-screen w-screen">
            <AppHeader />
            <main className="hidden md:flex flex-row w-screen max-h-screen text-clear-white my-5">
                <div className="w-7/12">
                    <StopSelectionInformation />
                </div>
                <div className="w-5/12">
                    <StopSelection />
                </div>
            </main>
            <main className="flex md:hidden flex-col w-screen max-h-screen text-clear-white my-5">
                <div className="p-4">
                    <StopSelectionInformation />
                </div>
                <div className="p-4">
                    <StopSelection />
                </div>
            </main>
        </div>
    );
};

export default CreateScreen;
