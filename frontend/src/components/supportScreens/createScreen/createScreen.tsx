import React from 'react';
import AppHeader from '../header';

import StopSelectionInformation from './stopSelectionInformation';
import StopSelection from './stopSelection';

const CreateScreen = () => {
    document.title = 'Omat Pysäkit - Luo näyttö';

    return (
        <div className="bg-nysse-blue-light h-screen w-screen">
            <AppHeader />
            <main className="hidden md:flex flex-row w-screen max-h-screen text-clear-white my-5">
                <div className="w-7/12">
                    <StopSelectionInformation />
                </div>
                <div className="w-5/12">
                    <StopSelection />
                </div>
            </main>
            <main className="grid md:hidden grid-rows-2 w-screen max-h-screen text-clear-white my-5">
                <StopSelectionInformation />
                <StopSelection />
            </main>
        </div>
    );
};

export default CreateScreen;
