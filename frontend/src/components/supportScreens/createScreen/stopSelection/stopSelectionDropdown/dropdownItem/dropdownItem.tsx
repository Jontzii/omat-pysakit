import React from 'react';

interface DropdownItemProps {
    name: string;
    code: string;
}

const DropdownItem = (props: DropdownItemProps) => {
    const { name, code } = props;

    return (
        <div
            className="flex justify-center px-4 py-1 w-full"
            key={`${name}:${code}`}
        >
            <button
                className="
                    w-full px-3 py-1.5 text-black
                    border border-solid border-nysse-light
                    rounded transition ease-in-out m-0
                    focus:outline-none bg-clear-white
                    hover:scale-105 duration-300
                "
            >
                <div className="grid grid-cols-2">
                    <div>
                        <p className="text-xl">{name}</p>
                        <p className=" text-xs">{code}</p>
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 block m-auto mr-0"
                        fill=""
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                    </svg>
                </div>
            </button>
        </div>
    );
};

export default DropdownItem;
