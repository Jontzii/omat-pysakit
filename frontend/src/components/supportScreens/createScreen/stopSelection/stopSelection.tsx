import React, { useEffect, useState } from 'react';

import StopSelectionForm from './stopSelectionForm';
import SelectedStops from './selectedStops';
import StopData from '../../../../types/stopData';

interface StopSelectionProps {
    stops: StopData[] | null;
    selectedStops: StopData[] | null;
    setSelected: Function;
}

const StopSelection = (props: StopSelectionProps) => {
    const { stops, selectedStops, setSelected } = props;

    /**
     * Add given stop to selection
     * @param stop
     */
    const handleSelection = (stop: StopData) => {
        setSelected((prevSelected: StopData[] | null) => {
            if (prevSelected) return [...prevSelected, stop];
            return [stop];
        });
    };

    /**
     * Remove given stop from selection
     * @param stop
     */
    const removeSelected = (stop: StopData) => {
        setSelected((prevSelected: StopData[] | null) => {
            if (prevSelected) {
                const newArr = prevSelected.filter(
                    (val: StopData) => val.gtfsId !== stop.gtfsId
                );

                if (newArr.length > 0) return newArr;
            }

            return null;
        });
    };

    return (
        <div className="flex flex-col justify-center items-center p-2 w-full">
            <h1 className="text-2xl font-medium">Valitse pysäkit näytöllesi</h1>
            <StopSelectionForm
                stops={stops}
                handleSelection={handleSelection}
            />
            {selectedStops && (
                <SelectedStops
                    selectedStops={selectedStops}
                    handleDelete={removeSelected}
                />
            )}
        </div>
    );
};

export default StopSelection;
