import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import SlidingMenu from '../menu';

const AppHeader = () => {
    const [menuOpen, setMenu] = useState(false);
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
                        onClick={onClick}
                        className="text-4xl md:text-5xl lg:text-6xl font-medium"
                    >
                        Omat Pysäkit
                    </button>

                    <button
                        className="
                            p-2 rounded-md hover:bg-nysse-blue-dark
                            focus:outline-none focus:ring-2 focus:ring-inset focus:ring-clear-white
                            transition duration-150 ease-in-out
                        "
                        onClick={() => setMenu(true)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <SlidingMenu menuVisible={menuOpen} setMenuOpen={setMenu} />
        </nav>
    );
};

export default AppHeader;
