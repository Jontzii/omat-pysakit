import { Request, Response } from 'express';
import { mocked } from 'jest-mock';
import { internalServerError, created, badRequest } from '@utils/responses';
import { createAndSaveScreen } from '../ScreenUtils';
import { getStops } from '@controllers/stops/fetchStopsUtils';
import {
    validateLanguages,
    checkTimePerLanguage,
    checkColumns,
    checkRows
} from './saveScreenUtils';
import {
    validateBody,
    checkStops,
    saveData,
    sendResponse
} from './saveScreenController';

jest.mock('@utils/logger');
jest.mock('@utils/responses');
jest.mock('@controllers/stops/fetchStopsUtils');
jest.mock('../ScreenUtils');
jest.mock('./saveScreenUtils');

const mockedBadRequest = mocked(badRequest, true);
const mockedCreated = mocked(created, true);
const mockedInternalServerError = mocked(internalServerError, true);
const mockedCreateAndSaveScreen = mocked(createAndSaveScreen, true);
const mockedGetStops = mocked(getStops, true);

const mockedValidateLanguage = mocked(validateLanguages, true);
const mockedCheckTimePerLanguage = mocked(checkTimePerLanguage, true);
const mockedCheckColumns = mocked(checkColumns, true);
const mockedCheckRows = mocked(checkRows, true);

describe('saveScreenController', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: jest.Mock;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {};
        mockNext = jest.fn();

        jest.resetAllMocks();
    });

    describe('validateBody', () => {
        test('Should add data to locals', async () => {
            mockRequest = {
                body: {
                    stops: ['3001', '3002'],
                    languages: ['fi']
                }
            };
            mockResponse = {
                locals: {}
            };

            mockedValidateLanguage.mockReturnValueOnce({
                displayFinnish: true,
                displaySwedish: false,
                displayEnglish: false
            });
            mockedCheckTimePerLanguage.mockReturnValueOnce({
                languageTime: 10
            });
            mockedCheckColumns.mockReturnValueOnce({ columns: 1 });
            mockedCheckRows.mockReturnValueOnce({ rows: 8 });

            await validateBody()(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockResponse.locals?.payload.stops).toEqual([
                'undefined:3001',
                'undefined:3002'
            ]);
            expect(mockResponse.locals?.payload.displayFinnish).toEqual(true);
            expect(mockResponse.locals?.payload.displaySwedish).toEqual(false);
            expect(mockResponse.locals?.payload.displayEnglish).toEqual(false);
            expect(mockResponse.locals?.payload.languageTime).toEqual(10);
            expect(mockResponse.locals?.payload.columns).toEqual(1);
            expect(mockResponse.locals?.payload.rows).toEqual(8);
        });

        test('Should return 400 if anything fails', async () => {
            await validateBody()(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockedBadRequest).toBeCalledTimes(1);
        });
    });

    describe('checkStops', () => {
        test('Should call next when successful', async () => {
            mockResponse = {
                locals: {
                    payload: {
                        stops: ['3001', '3002']
                    }
                }
            };

            mockedGetStops.mockResolvedValueOnce(['3000', '3001', '3002']);

            await checkStops()(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockNext).toBeCalledTimes(1);
        });

        test('Should work with no stops selected', async () => {
            mockResponse = {
                locals: {
                    payload: {
                        stops: []
                    }
                }
            };

            mockedGetStops.mockResolvedValueOnce(['3000', '3001', '3002']);

            await checkStops()(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockNext).toBeCalledTimes(1);
        });

        test('Should return 400 when stop not found', async () => {
            mockResponse = {
                locals: {
                    payload: {
                        stops: ['3001', '3002']
                    }
                }
            };

            mockedGetStops.mockResolvedValueOnce(['3000', '3001']);

            await checkStops()(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockedBadRequest).toBeCalledTimes(1);
            expect(mockNext).not.toBeCalled();
        });

        test('Should return 500 if anything fails', async () => {
            mockResponse = {
                locals: {
                    payload: {
                        stops: ['3001', '3002']
                    }
                }
            };

            mockedGetStops.mockImplementationOnce(() => {
                throw new Error();
            });

            await checkStops()(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockedInternalServerError).toBeCalledTimes(1);
            expect(mockNext).not.toBeCalled();
        });
    });

    describe('saveData', () => {
        test('Should save data', async () => {
            mockResponse = {
                locals: {
                    payload: 'test'
                }
            };

            await saveData()(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockedCreateAndSaveScreen).toBeCalledWith('test');
            expect(mockedCreateAndSaveScreen).toBeCalledTimes(1);
            expect(mockNext).toBeCalledTimes(1);
        });

        test('Should return 500 if anything fails', async () => {
            mockedCreateAndSaveScreen.mockImplementationOnce(() => {
                throw new Error();
            });

            mockResponse = {
                locals: {
                    payload: 'test'
                }
            };

            await saveData()(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockedInternalServerError).toBeCalledTimes(1);
            expect(mockNext).not.toBeCalled();
        });
    });

    describe('sendData', () => {
        test('Should send data in locals', async () => {
            mockResponse = {
                locals: {
                    payload: 'test'
                }
            };

            await sendResponse()(
                mockRequest as Request,
                mockResponse as Response
            );

            expect(mockedCreated).toBeCalledTimes(1);
            expect(mockedCreated).toBeCalledWith(
                mockRequest,
                mockResponse,
                'test'
            );
        });
    });
});
