type ScreenSettings = {
    uuid: string;
    stops: string[];
    displayFinnish: boolean;
    displaySwedish: boolean;
    displayEnglish: boolean;
    languageTime?: number;
    columns?: number;
    rows?: number;
};

export default ScreenSettings;
