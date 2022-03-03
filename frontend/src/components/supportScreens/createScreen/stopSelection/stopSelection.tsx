import React, { useEffect, useState } from 'react';

import StopSelectionForm from './stopSelectionForm';
import StopData from '../../../../types/stopData';

import { getStops } from '../../../../services/stopsService';

const StopSelection = () => {
    const [stops, setStops] = useState<StopData[] | null>(null);
    const [selectedStops, setSelected] = useState<StopData[] | null>(null);

    useEffect(() => {
        getStops()
            .then((data) => setStops(data))
            .catch(() => console.error('Could not fetch stops'));
    }, []);

    const handleChange = (stop: string) => {};

    return (
        <div className="flex flex-col justify-center items-center p-2 w-full">
            <h1 className="text-2xl font-medium">Valitse pysäkit näytöllesi</h1>
            <StopSelectionForm stops={stops} addSelection={handleChange} />
        </div>
    );
};

export default StopSelection;
