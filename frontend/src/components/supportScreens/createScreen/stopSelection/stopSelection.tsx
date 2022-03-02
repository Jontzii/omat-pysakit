import react, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoadingSpinner from '../../../uiElements/spinner';

const StopSelection = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    const onClick = (e: any) => {
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
                    Valitse pysäkit näytöllesi
                </h1>
            </div>
            <div className="flex flex-col justify-center items-center p-2">
                <h1 className="text-2xl font-medium p-4">Luo näyttö</h1>
                <button
                    className="
                        bg-nysse-blue-dark font-bold py-4 px-8 rounded-full
                        transition duration-150 ease-in-out
                        border border-solid border-nysse-light 
                        hover:bg-nysse-light hover:text-nysse-blue-dark
                        w-full items-center text-center
                    "
                    onClick={onClick}
                    disabled={isLoading}
                >
                    {(isLoading && <LoadingSpinner />) || 'Luo uusi näyttö'}
                </button>
            </div>
        </div>
    );
};

export default StopSelection;
