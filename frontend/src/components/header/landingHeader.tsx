import react from 'react';

const LandingHeader = (props: any) => {
    const { displayBackArrow, arrowTarget } = props;

    return (
        <nav className="bg-nysse-blue-light border-solid border-b-2 border-clear-white">
            <div className=" max-w-full mx-auto px-2 sm:px-6 lg:px-8 text-clear-white">
                <div className="relative flex items-center justify-between h-16 md:h-20 lg:h-24">
                    <span className="hidden sm:block"></span>
                    <div className="text-4xl md:text-5xl lg:text-6xl">
                        Omat Pysäkit
                    </div>
                    <button className="p-2 rounded-md hover:bg-nysse-blue-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-clear-white">
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
        </nav>
    );
};

export default LandingHeader;
