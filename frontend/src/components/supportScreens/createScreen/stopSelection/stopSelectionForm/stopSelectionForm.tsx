import React, { useState } from 'react';

const StopSelectionForm = () => {
    const [stops, setStops] = useState([]);
    const [selected, setSelected] = useState([]);
    const [stopId, setStopId] = useState('');

    const handleSubmit = (e: any) => {
        console.log('Added stop to list');
    };

    return (
        <form
            className="flex justify-center p-4 w-full"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                placeholder="Pysäkki"
                className="
                    w-6/12 px-3 py-1.5 text-black
                    border border-solid border-nysse-light
                    rounded transition ease-in-out m-0
                    focus:outline-none"
                value={stopId}
                onChange={(e) => setStopId(e.target.value)}
            />
            <button
                type="submit"
                className="
                    bg-nysse-blue-dark inline-block px-6 py-2.5 rounded shadow-md
                    hover:bg-nysse-light hover:text-nysse-blue-dark
                    disabled:bg-nysse-light disabled:text-nysse-blue-dark
                    transition duration-150 ease-in-out items-center"
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </button>
        </form>
    );
};

export default StopSelectionForm;
