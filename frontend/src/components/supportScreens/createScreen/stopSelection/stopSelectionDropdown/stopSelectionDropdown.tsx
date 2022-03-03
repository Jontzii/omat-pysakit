import React from 'react';
import DropdownItem from './dropdownItem';
import StopData from '../../../../../types/stopData';

interface DropdownProps {
    results: StopData[] | null;
    noInput: boolean;
}

const StopSelectionDropdown = (props: DropdownProps) => {
    const { results, noInput } = props;

    const items: any[] = [];

    if (results) {
        for (let i = 0; i < Math.min(results.length, 3); i += 1) {
            const stop = results[i];
            items.push(DropdownItem({ name: stop.name, code: stop.code }));
        }
    }

    return (
        <div className="w-full px-4 bg-nysse-blue-light">
            <div
                id="container"
                className="
                    w-full flex flex-col justify-center items-center
                    py-2 bg-nysse-blue-dark rounded-b text-xl font-light"
            >
                {noInput && 'Kirjoita saadaksesi ehdotuksia'}
                {items.length > 0 && items}
                {!noInput && items.length === 0 && 'Pysäkkejä ei löytynyt!'}
            </div>
        </div>
    );
};

export default StopSelectionDropdown;
