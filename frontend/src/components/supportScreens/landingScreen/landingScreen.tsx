import React from 'react';

// Components
import AppHeader from '../header';
import ScreenSelectionInformation from './screenSelectionInformation';
import ScreenSelection from './screenSelection';

const LandingScreen = () => {
    return (
        <div className="bg-nysse-blue-light h-screen w-screen">
            <AppHeader />
            <main className="hidden md:grid grid-cols-2 w-screen max-h-screen text-clear-white my-5">
                <ScreenSelectionInformation />
                <ScreenSelection />
            </main>
            <main className="grid md:hidden grid-rows-2 w-screen max-h-screen text-clear-white my-5">
                <ScreenSelectionInformation />
                <ScreenSelection />
            </main>
        </div>
    );
};

export default LandingScreen;
