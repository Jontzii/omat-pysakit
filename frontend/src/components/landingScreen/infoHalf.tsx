import react from 'react';

const InfoHalf = () => {
    return (
        <div className="flex flex-col justify-center text-center md:text-left px-4 md:px-8 lg:px-12 space-y-6">
            <h1 className="text-4xl font-medium">
                Luo itsellesi oma pysäkkinäyttö
            </h1>

            <p className="text-xl">
                Tällä palvelulla voit luoda itsellesi oman pysäkkinäytön johon
                voit valita ne pysäkit joiden aikatauluista olet kiinnostunut.
            </p>
            <p className="text-xl">
                Pysäkkinäkymä kertoo seuraavaan seuraavat valituille pysäkeille
                saapuvat linjat sekä niiden saapumisajat.
            </p>
        </div>
    );
};

export default InfoHalf;
