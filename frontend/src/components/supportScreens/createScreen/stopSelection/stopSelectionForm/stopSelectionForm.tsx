import React, { useState } from 'react';

import StopData from '../../../../../types/stopData';
import StopSelectionDropdown from '../stopSelectionDropdown';

interface StopSelectionFormProps {
    stops: StopData[] | null;
    handleSelection: Function;
}

const StopSelectionForm = (props: StopSelectionFormProps) => {
    const { stops, handleSelection } = props;
    const [stopId, setStopId] = useState('');
    const [results, setResults] = useState<StopData[] | null>(null);

    const isLoading = !stops || stops.length === 0;

    const onChange = (e: any) => {
        e.preventDefault();

        if (e.target.value.length < 1) {
            setResults(null);
            return setStopId(e.target.value);
        }

        if (!stops) {
            return setStopId(e.target.value);
        }

        const input = e.target.value.toUpperCase();
        const filtered = stops?.filter((val) => {
            return (
                val.name.toUpperCase().indexOf(input) > -1 ||
                val.code.toUpperCase().indexOf(input) > -1
            );
        });

        setResults(filtered);
        setStopId(e.target.value);
    };

    return (
        <>
            <form
                className="flex justify-center p-4 pb-0 w-full"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    type="text"
                    placeholder={
                        (isLoading && 'Ladataan pysäkkejä...') ||
                        'Pysäkin nimi tai numero'
                    }
                    disabled={isLoading}
                    className="
                        w-full px-3 py-1.5 text-black
                        border border-solid border-nysse-light
                        rounded-t transition ease-in-out m-0
                        focus:outline-none"
                    value={stopId}
                    onChange={onChange}
                />
            </form>
            <StopSelectionDropdown
                results={results}
                noInput={stopId.length === 0}
                handleSelection={handleSelection}
            />
        </>
    );
};

export default StopSelectionForm;
