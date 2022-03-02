import react from 'react';
import AppHeader from '../header';

import StopSelectionInformation from './stopSelectionInformation';
import StopSelection from './stopSelection';

const CreateScreen = () => {
    document.title = 'Omat Pysäkit - Luo näyttö';

    return (
        <div className="bg-nysse-blue-light h-screen w-screen">
            <AppHeader />
            <main className="hidden md:grid grid-cols-2 w-screen max-h-screen text-clear-white my-5">
                <StopSelectionInformation />
                <StopSelection />
            </main>
            <main className="grid md:hidden grid-rows-2 w-screen max-h-screen text-clear-white my-5">
                <StopSelectionInformation />
                <StopSelection />
            </main>
        </div>
    );
};

export default CreateScreen;
