import Logger from '@utils/logger';
import _ from 'lodash';

export const validateLanguages = (
    langs: string[]
): {
    displayFinnish: boolean;
    displaySwedish: boolean;
    displayEnglish: boolean;
} => {
    // 1 - 3 languages can selected
    if (langs.length < 1 || langs.length > 3) {
        Logger.warn('Incorrect amount of languages given');
        throw new Error('Incorrect amount of languages given');
    }

    // Only 3 different values allowed
    if (!_.every(langs, (value) => _.includes(['fi', 'sv', 'en'], value))) {
        Logger.warn('Incorrect language given');
        throw new Error('Incorrect language given');
    }

    // Check for duplicates
    if (new Set(langs).size !== langs.length) {
        Logger.warn('Languages contained duplicates');
        throw new Error('Languages contained duplicates');
    }

    return {
        displayFinnish: langs.includes('fi'),
        displaySwedish: langs.includes('sv'),
        displayEnglish: langs.includes('en')
    };
};

/**
 * Check time per language
 * @param value Time per language
 * @returns
 */
export const checkTimePerLanguage = (
    value: number | undefined
): { languageTime: number } => {
    if (value && value > 0) {
        return { languageTime: value };
    } else {
        return { languageTime: 8 };
    }
};

/**
 * Check columns
 * @param value Columns
 * @returns
 */
export const checkColumns = (
    value: number | undefined
): { columns: number } => {
    if (value && value > 0) {
        return { columns: value };
    } else {
        return { columns: 1 };
    }
};

/**
 * Check rows
 * @param value Rows
 * @returns
 */
export const checkRows = (value: number | undefined): { rows: number } => {
    if (value && value > 0) {
        return { rows: value };
    } else {
        return { rows: 8 };
    }
};
