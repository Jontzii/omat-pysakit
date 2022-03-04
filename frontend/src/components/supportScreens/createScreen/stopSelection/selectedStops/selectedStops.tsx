import React, { useEffect, useState } from 'react';
import StopData from '../../../../../types/stopData';

import SelectedStopItem from './selectedStopItem';

interface SelectedStopsProps {
    selectedStops: StopData[];
    handleDelete: Function;
}

const SelectedStops = (props: SelectedStopsProps) => {
    const { selectedStops, handleDelete } = props;
    const [items, setItems] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const newItems: JSX.Element[] = [];

        for (let i = 0; i < selectedStops.length; i += 1) {
            const stop = selectedStops[i];
            newItems.push(
                SelectedStopItem({ stop: stop, onClick: handleDelete })
            );
        }

        setItems(newItems);
    }, [selectedStops, handleDelete]);

    return (
        <div className="w-full px-4 bg-nysse-blue-light">
            <h1 className="text-2xl font-medium text-center p-4">
                Valitut pysäkit
            </h1>
            <div
                id="container-selected"
                className="
                    w-full flex flex-col justify-center items-center
                    py-2 bg-nysse-blue-dark rounded text-xl font-light"
            >
                {items.length > 0 && items}
                {items.length === 0 && 'Jokin meni pieleen!'}
            </div>
        </div>
    );
};

export default SelectedStops;
