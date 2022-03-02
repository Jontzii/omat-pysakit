import react from 'react';

const stopSelectionInformation = () => {
    return (
        <div className="flex flex-col justify-center text-center md:text-left px-4 md:px-8 lg:px-12 space-y-6">
            <h1 className="text-4xl font-medium">
                Luo itsellesi oma pysäkkinäyttö
            </h1>

            <p className="text-xl">
                Voit luoda näytön valitsemalla haluamasi pysäkit tällä sivulla
                olevasta valikosta. Valittujen pysäkkien kaikki ajat tullaan
                näyttämään samalla näytöllä lähtöaikataulun mukaan.
            </p>
        </div>
    );
};

export default stopSelectionInformation;
