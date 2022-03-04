import React from 'react';
import StopData from '../../../../../../types/stopData';

interface DropdownItemProps {
    stop: StopData;
    onClick: any;
}

const DropdownItem = (props: DropdownItemProps) => {
    const { stop, onClick } = props;

    return (
        <div
            className="flex justify-center px-4 py-1 w-full"
            key={`dropdown-${stop.name}:${stop.code}`}
        >
            <button
                className="
                    w-full px-3 py-1.5 text-black
                    border border-solid border-nysse-light
                    rounded transition ease-in-out m-0
                    focus:outline-none bg-clear-white
                    hover:scale-105 duration-300
                "
                onClick={() => onClick(stop)}
            >
                <div className="flex flex-row text-left">
                    <div className="w-10/12">
                        <p className="text-xl">{stop.name}</p>
                        <p className="text-xs">{stop.code}</p>
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 block m-auto mr-0"
                        fill=""
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                    </svg>
                </div>
            </button>
        </div>
    );
};

export default DropdownItem;
