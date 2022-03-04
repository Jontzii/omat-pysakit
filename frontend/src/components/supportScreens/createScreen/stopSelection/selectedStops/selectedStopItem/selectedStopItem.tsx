import React from 'react';
import StopData from '../../../../../../types/stopData';

interface SelectedStopItemProps {
    stop: StopData;
    onClick: any;
}

const SelectedStopItem = (props: SelectedStopItemProps) => {
    const { stop, onClick } = props;

    return (
        <div
            className="flex justify-center px-4 py-1 w-full"
            key={`selected-${stop.name}:${stop.code}`}
        >
            <div
                className="
                    w-full px-3 py-1.5 text-black
                    bg-clear-white rounded rounded-r-none
                    border border-solid border-nysse-light
                    border-r-0 font-normal
                "
            >
                <p className="text-xl">{stop.name}</p>
                <p className="text-xs">{stop.code}</p>
            </div>
            <button
                className="
                    bg-clear-white text-black
                    inline-block px-6 py-2.5 shadow-md
                    rounded  rounded-l-none items-center
                    border border-solid border-nysse-light border-l-0
                    hover:bg-nysse-light hover:text-nysse-blue-dark
                    disabled:bg-nysse-light disabled:text-nysse-blue-dark
                    transition duration-300 ease-in-out
                "
                onClick={() => onClick(stop)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
    );
};

export default SelectedStopItem;
