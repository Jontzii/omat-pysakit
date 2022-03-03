import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import StopSelectionForm from './stopSelectionForm';

const StopSelection = () => {
    const [selectedStops, setSelected] = useState([]);

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center p-2 w-full">
                <h1 className="text-2xl font-medium">
                    Valitse pysäkit näytöllesi
                </h1>
                <StopSelectionForm />
            </div>
        </div>
    );
};

export default StopSelection;
