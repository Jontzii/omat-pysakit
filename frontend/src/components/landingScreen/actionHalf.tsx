import react, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ScreenForm from './block/screenForm';
import LoadingSpinner from './block/spinner';

const ActionHalf = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    const directToCreateScreen = (e: any) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            navigate('/createScreen');
        }, 250);
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center p-2 w-full">
                <h1 className="text-2xl font-medium">
                    Avaa olemassa oleva näyttö
                </h1>
                <ScreenForm />
            </div>
            <div className="flex flex-col justify-center items-center p-2 w-full">
                <h1 className="text-2xl font-medium p-4">
                    Luo uusi pysäkkinäyttö
                </h1>
                <button
                    className="
                        bg-nysse-blue-dark font-bold py-4 px-8 rounded-full
                        transition duration-150 ease-in-out
                        border border-solid border-nysse-light 
                        hover:bg-nysse-light hover:text-nysse-blue-dark
                    "
                    onClick={directToCreateScreen}
                    disabled={isLoading}
                >
                    {(isLoading && <LoadingSpinner />) || 'Luo uusi näyttö'}
                </button>
            </div>
        </div>
    );
};

export default ActionHalf;