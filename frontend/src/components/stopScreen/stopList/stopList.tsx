import React from 'react';

interface StopListProps {
    stops: string[] | null;
}

const StopList = (props: StopListProps) => {
    const { stops } = props;

    return (
        <div
            className="
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                text-clear-white text-center"
        >
            <h1 className="text-6xl font-medium">Under construction</h1>
        </div>
    );
};

export default StopList;
