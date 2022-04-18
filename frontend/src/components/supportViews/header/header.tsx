import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const AppHeader = () => {
    const [infoOpen, setInfoOpen] = useState(false);
    const navigate = useNavigate();

    const onClick = (e: any) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <nav className="bg-nysse-blue-light border-solid border-b-2 border-clear-white">
            <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-8 text-clear-white">
                <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">
                    <span className="hidden sm:block" />
                    <button
                        data-testid="logo-button"
                        onClick={onClick}
                        className="text-4xl md:text-5xl lg:text-6xl font-medium"
                    >
                        Omat Pysäkit
                    </button>

                    <button
                        data-testid="menu-button"
                        className="
                            p-2 rounded-md hover:bg-nysse-blue-dark
                            focus:outline-none focus:ring-2 focus:ring-inset focus:ring-clear-white
                            transition duration-150 ease-in-out
                        "
                        onClick={() => setInfoOpen(true)}
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
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default AppHeader;
