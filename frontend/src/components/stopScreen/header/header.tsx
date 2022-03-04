import React from 'react';

interface HeaderProps {
    stopNames: string[];
}

const ScreenHeader = (props: HeaderProps) => {
    return (
        <nav className="bg-nysse-blue-light border-solid border-b-2 border-clear-white">
            YAAS
        </nav>
    );
};

export default ScreenHeader;
