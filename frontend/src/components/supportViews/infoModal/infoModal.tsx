import React from 'react';

interface InfoModalProps {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
}

const InfoModal = ({ showModal, setShowModal }: InfoModalProps) => {
    const onCloseClick = () => setShowModal(false);

    const onDivClick = (e: any) => {
        if (e.target === e.currentTarget) {
            setShowModal(false);
        }
    };

    const content = (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between">
                <span className="hidden md:block" style={{ width: '48px' }} />
                <h1 data-testid="modal-info" className="text-5xl">
                    Tietoja
                </h1>
                <button
                    data-testid="close-button"
                    className="p-2 rounded-md hover:bg-nysse-blue-light
                            focus:outline-none focus:ring-2 focus:ring-inset focus:ring-clear-white
                            transition duration-150 ease-in-out"
                    onClick={onCloseClick}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </button>
            </div>

            <div className="py-4">
                <div className="w-full border-b border-clear-white"></div>
            </div>

            <div className="h-full">
                <p className="text-2xl p-2">
                    Made by&nbsp;
                    <a
                        href="https://github.com/jontzii"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Jontzii
                    </a>
                </p>

                <p className="text-xl p-2">
                    Source code available at
                    <br />
                    <a
                        href="https://github.com/jontzii/omat-pysakit"
                        target="_blank"
                        rel="noreferrer"
                    >
                        https://github.com/jontzii/omat-pysakit
                    </a>
                </p>
            </div>
        </div>
    );

    return (
        <>
            {!showModal ? null : (
                <>
                    <div
                        className="
                            block md:hidden absolute top-0 left-0 
                            text-center w-screen h-screen z-50"
                    >
                        <div className="grid place-items-center h-screen">
                            <div
                                className="
                                    bg-nysse-blue-dark text-clear-white border-2
                                    border-clear-white rounded p-4 w-screen h-screen"
                            >
                                {content}
                            </div>
                        </div>
                    </div>
                    <div
                        className="
                            hidden md:block absolute top-0 left-0
                            text-center w-screen h-screen z-50"
                    >
                        <div
                            className="grid place-items-center h-screen"
                            onClick={onDivClick}
                        >
                            <div
                                className="
                                    bg-nysse-blue-dark text-clear-white border-2 
                                    border-clear-white rounded p-4"
                                style={{ width: '700px', height: '600px' }}
                            >
                                {content}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default InfoModal;
