import react from 'react';

// Components
import AppHeader from '../header/appHeader';
import InfoHalf from './infoHalf';
import ActionHalf from './actionHalf';

const LandingScreen = () => {
    return (
        <div className="bg-nysse-blue-light h-screen w-screen">
            <AppHeader />
            <main className="hidden md:grid grid-cols-2 w-screen max-h-screen text-clear-white my-5">
                <InfoHalf />
                <ActionHalf />
            </main>
            <main className="grid md:hidden grid-rows-2 w-screen max-h-screen text-clear-white my-5">
                <InfoHalf />
                <ActionHalf />
            </main>
        </div>
    );
};

export default LandingScreen;
