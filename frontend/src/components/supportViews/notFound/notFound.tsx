import React from 'react';
import { useNavigate } from 'react-router';

const NotFound = () => {
    const navigate = useNavigate();

    const onClick = (e: any) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <div className="w-screen h-screen bg-nysse-blue-light">
            <div
                className="
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    text-clear-white text-center"
            >
                <h1 data-testid="404-text" className="text-8xl font-bold">
                    404
                </h1>
                <h1
                    data-testid="explainer-text"
                    className="text-3xl font-medium"
                >
                    Sivua ei löytynyt
                </h1>

                <div className="flex flex-col justify-center items-center m-5">
                    <button
                        data-testid="navigate-button"
                        onClick={onClick}
                        className="
                        bg-nysse-blue-dark font-bold py-4 px-8 rounded-full w-fit
                        transition duration-150 ease-in-out
                        border border-solid border-nysse-light 
                        hover:bg-nysse-light hover:text-nysse-blue-dark
                        items-center text-center"
                    >
                        Etusivulle
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
