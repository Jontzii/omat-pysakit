import React, { useEffect, useState } from 'react';

interface HeaderProps {
    stops: string[];
}

const ScreenHeader = ({ stops }: HeaderProps) => {
    const [shownStop, setShownStop] = useState<number>(0);

    useEffect(() => {
        let timer: NodeJS.Timer;

        timer = setTimeout(() => {
            if (shownStop < stops.length - 1) {
                setShownStop(shownStop + 1);
            } else {
                setShownStop(0);
            }
        }, 2500);

        return () => clearInterval(timer);
    }, [shownStop, stops.length]);

    return (
        <nav className="bg-nysse-blue-light border-solid border-b-2 border-clear-white">
            <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-8 text-clear-white">
                <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">
                    <span className="hidden sm:block" />
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium pl-2 sm:pl-0">
                        {stops[shownStop] || ''}
                    </h1>
                    <span className="hidden sm:block" />
                </div>
            </div>
        </nav>
    );
};

export default ScreenHeader;
