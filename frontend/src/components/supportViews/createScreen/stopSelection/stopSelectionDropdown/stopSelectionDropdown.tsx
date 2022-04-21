import React, { useEffect, useState } from 'react';
import DropdownItem from './dropdownItem';
import StopData from '../../../../../types/stopData';

interface DropdownProps {
    results: StopData[] | null;
    noInput: boolean;
    handleSelection: Function;
}

const StopSelectionDropdown = (props: DropdownProps) => {
    const { results, noInput, handleSelection } = props;
    const [items, setItems] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const newItems: JSX.Element[] = [];

        if (results) {
            for (let i = 0; i < Math.min(results.length, 6); i += 1) {
                const stop = results[i];
                newItems.push(
                    DropdownItem({ stop: stop, onClick: handleSelection })
                );
            }
        }

        setItems(newItems);
    }, [results, handleSelection]);

    return (
        <div className="w-full px-4 bg-nysse-blue-light relative">
            <div
                id="dropdown-container"
                className="
                    flex flex-col justify-center items-center
                    py-2 bg-nysse-blue-dark rounded-b text-xl font-light
                    border-2 border-solid border-t-0 border-clear-white
                    absolute top-0 left-4 right-4 z-10
                "
            >
                {noInput && 'Kirjoita saadaksesi ehdotuksia'}
                {items.length > 0 && items}
                {!noInput && items.length === 0 && 'Pysäkkejä ei löytynyt!'}
            </div>
        </div>
    );
};

export default StopSelectionDropdown;
