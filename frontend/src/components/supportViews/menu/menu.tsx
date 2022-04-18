import React from 'react';

interface MenuProps {
    menuVisible: boolean;
    setMenuOpen: Function;
}

const SlidingMenu = ({ menuVisible, setMenuOpen }: MenuProps) => {
    let visible = 'overflow-scroll translate-x-full';

    if (menuVisible) {
        visible = 'overflow-hidden translate-x-0';
    }

    return (
        <div
            className={
                'fixed transition-transform h-full w-screen md:w-80 top-0 right-0 bg-nysse-blue-dark text-clear-white md:border-l-2 md:border-solid md:border-clear-white z-50' +
                visible
            }
        >
            <div>
                <button
                    className="
                        fixed top-2 right-2 p-2 rounded-md
                        hover:bg-nysse-blue-light focus:outline-none
                        focus:ring-2 focus:ring-inset focus:ring-clear-white
                        transition duration-150 ease-in-out
                    "
                    onClick={() => setMenuOpen(false)}
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
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <div className="flex flex-col w-full">
                    <div className="w-full p-4 text-left">
                        <h1 className="text-4xl font-medium">Valitse kieli</h1>
                        <div className="grid grid-rows-3 items-stretch text-left text-xl underline py-4">
                            <button className="text-left">Suomi</button>
                            <button className="text-left line-through">
                                English
                            </button>
                        </div>
                    </div>
                </div>
                <div className="fixed w-full bottom-5">
                    <div className="grid grid-cols-1 items-center text-center text-xl underline">
                        <button>Tietoja</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlidingMenu;
