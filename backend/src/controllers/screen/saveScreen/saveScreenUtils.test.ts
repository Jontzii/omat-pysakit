import {
    validateLanguages,
    checkTimePerLanguage,
    checkColumns,
    checkRows
} from './saveScreenUtils';
import Logger from '@utils/logger';
import { mocked } from 'jest-mock';

jest.mock('@utils/logger');

const mockedLogger = mocked(Logger, true);

describe('saveScreenUtils', () => {
    describe('validateLanguages', () => {
        beforeEach(() => {
            jest.resetAllMocks();
        });

        test('Should fail when no languages given', () => {
            expect(() => validateLanguages([])).toThrow(
                'Incorrect amount of languages given'
            );
            expect(mockedLogger.warn).toBeCalledTimes(1);
        });

        test('Should fail when over 3 languages given', () => {
            expect(() => validateLanguages(['fi', 'sv', 'en', 'ge'])).toThrow(
                'Incorrect amount of languages given'
            );
            expect(mockedLogger.warn).toBeCalledTimes(1);
        });

        test('Should fail when given non allowed value', () => {
            expect(() => validateLanguages(['fi', 'ch', 'sv'])).toThrow(
                'Incorrect language given'
            );
            expect(mockedLogger.warn).toBeCalledTimes(1);
        });

        test('Should fail when there are duplicates', () => {
            expect(() => validateLanguages(['fi', 'fi', 'en'])).toThrow(
                'Languages contained duplicates'
            );
            expect(mockedLogger.warn).toBeCalledTimes(1);
        });

        test('Should return correct values #1', () => {
            const langs = ['fi', 'en'];

            expect(validateLanguages(langs)).toEqual({
                displayFinnish: true,
                displaySwedish: false,
                displayEnglish: true
            });
        });

        test('Should return correct values #2', () => {
            const langs = ['fi', 'en', 'sv'];

            expect(validateLanguages(langs)).toEqual({
                displayFinnish: true,
                displaySwedish: true,
                displayEnglish: true
            });
        });

        test('Should return correct values #3', () => {
            const langs = ['en', 'sv'];

            expect(validateLanguages(langs)).toEqual({
                displayFinnish: false,
                displaySwedish: true,
                displayEnglish: true
            });
        });
    });

    describe('checkTimePerLanguage', () => {
        test('Should return 8 when input undefined', () => {
            expect(checkTimePerLanguage(undefined)).toEqual({
                languageTime: 8
            });
        });

        test('Should return 8 when input is 0', () => {
            expect(checkTimePerLanguage(0)).toEqual({ languageTime: 8 });
        });

        test('Should return 8 when input is less than 0', () => {
            expect(checkTimePerLanguage(-1)).toEqual({ languageTime: 8 });
        });

        test('Should return value when correct', () => {
            expect(checkTimePerLanguage(4)).toEqual({ languageTime: 4 });
        });
    });

    describe('checkColumns', () => {
        test('Should return 1 when input undefined', () => {
            expect(checkColumns(undefined)).toEqual({ columns: 1 });
        });

        test('Should return 1 when input is 0', () => {
            expect(checkColumns(0)).toEqual({ columns: 1 });
        });

        test('Should return 1 when input is less than 0', () => {
            expect(checkColumns(-1)).toEqual({ columns: 1 });
        });

        test('Should return value when correct', () => {
            expect(checkColumns(2)).toEqual({ columns: 2 });
        });
    });

    describe('checkRows', () => {
        test('Should return 8 when input undefined', () => {
            expect(checkRows(undefined)).toEqual({ rows: 8 });
        });

        test('Should return 8 when input is 0', () => {
            expect(checkRows(0)).toEqual({ rows: 8 });
        });

        test('Should return 8 when input is less than 0', () => {
            expect(checkRows(-1)).toEqual({ rows: 8 });
        });

        test('Should return value when correct', () => {
            expect(checkRows(4)).toEqual({ rows: 4 });
        });
    });
});
