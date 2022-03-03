import React, { useState } from 'react';
import LoadingSpinner from '../../../../uiElements/loadingSpinner';
import StopData from '../../../../../types/stopData';
import StopSelectionDropdown from '../stopSelectionDropdown';

interface StopSelectionFormProps {
    stops: StopData[] | null;
    addSelection: Function;
}

const StopSelectionForm = (props: StopSelectionFormProps) => {
    const { stops, addSelection } = props;
    const [stopId, setStopId] = useState('');
    const [results, setResults] = useState(stops);

    const isLoading = !stops || stops.length === 0;
    const showDropdown = stopId.length > 2;

    const handleSubmit = (e: any) => {
        e.preventDefault();
        addSelection(stopId);
    };

    const onChange = (e: any) => {
        e.preventDefault();
        setStopId(e.target.value);

        const input = e.target.value.toUpperCase();

        if (!stops) {
            return setStopId(e.target.value);
        }

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
                onSubmit={handleSubmit}
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
            <StopSelectionDropdown results={results} />
        </>
    );
};

export default StopSelectionForm;
