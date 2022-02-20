import react from 'react';

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
                'fixed transition-transform h-screen w-screen md:w-80 top-0 right-0 bg-nysse-blue-dark text-clear-white border-l-2 border-solid border-clear-white z-50' +
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
                <div className="flex flex-col p-2">
                    <p>First</p>
                    <p>Second</p>
                    <p>Third</p>
                </div>
            </div>
        </div>
    );
};

export default SlidingMenu;
