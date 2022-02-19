import react, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

import { checkIfScreenExists } from '../../../services/screenService';

const ScreenForm = () => {
    const [uuid, setUuid] = useState('');
    const [isLoading, setLoading] = useState(false);

    const navigation = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (uuid.length === 0) {
            return toast.error('Näytön ID ei voi olla tyhjä!');
        }

        setLoading(true);

        if (!(await checkIfScreenExists(uuid))) {
            toast.error('Näyttöä ei löytynyt!');
            return setLoading(false);
        }

        navigation(`/screen?id=${uuid}`);
    };

    return (
        <form
            className="flex justify-center p-4 w-full"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                placeholder="Näytön ID"
                className="
                    w-6/12 px-3 py-1.5 text-black
                    border border-solid border-nysse-light
                    rounded transition ease-in-out m-0
                    focus:outline-none"
                value={uuid}
                onChange={(e) => setUuid(e.target.value)}
            />
            <button
                type="submit"
                disabled={isLoading}
                className="
                    bg-nysse-blue-dark inline-block px-6 py-2.5 rounded shadow-md
                    hover:bg-nysse-light hover:text-nysse-blue-dark
                    disabled:bg-nysse-light disabled:text-nysse-blue-dark
                    transition duration-150 ease-in-out items-center"
            >
                {isLoading && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                    </svg>
                )}
                {!isLoading && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
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
                )}
            </button>
        </form>
    );
};

export default ScreenForm;
