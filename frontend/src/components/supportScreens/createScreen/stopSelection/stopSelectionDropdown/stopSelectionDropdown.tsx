import React from 'react';
import DropdownItem from './dropdownItem';
import StopData from '../../../../../types/stopData';

interface DropdownProps {
    results: StopData[] | null;
}

const StopSelectionDropdown = (props: DropdownProps) => {
    const { results } = props;

    const items = [
        DropdownItem({ name: 'First', code: '3001' }),
        DropdownItem({ name: 'First', code: '3002' }),
        DropdownItem({ name: 'Second', code: '3003' })
    ];

    return (
        <div className="w-full px-4 pb-2 bg-nysse-blue-light">
            <div
                id="container"
                className="
                    w-full flex flex-col justify-center items-center
                    pt-2 pb-1 bg-nysse-blue-dark rounded-b
                "
            >
                {items}
            </div>
        </div>
    );
};

export default StopSelectionDropdown;
