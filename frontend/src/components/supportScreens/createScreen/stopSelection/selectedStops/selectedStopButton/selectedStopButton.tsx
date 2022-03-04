import React, { useState } from 'react';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../../../../uiElements/loadingSpinner';

interface SelectedStopButtonProps {
    handlepost: Function;
}

const SelectedStopButton = (props: SelectedStopButtonProps) => {
    const [isLoading, setLoading] = useState(false);
    const { handlepost } = props;

    const onClick = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const response = await handlepost();

        if (response === false) {
            setLoading(false);
            toast.error('Näytön luonti ei onnistunut :-(');
        }
    };

    return (
        <div className="w-full justify-center px-4 py-1">
            <button
                className="
                    w-full px-3 py-1.5 bg-clear-white text-black
                    rounded border border-solid border-nysse-light
                    font-normal hover:bg-nysse-light
                    transition duration-300 ease-in-out
                "
                onClick={onClick}
            >
                {!isLoading && 'Luo näyttö'}
                {isLoading && <LoadingSpinner />}
            </button>
        </div>
    );
};

export default SelectedStopButton;
