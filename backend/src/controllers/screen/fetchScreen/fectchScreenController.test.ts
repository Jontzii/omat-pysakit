import { Request, Response } from 'express';
import { mocked } from 'jest-mock';
import { internalServerError, notFound, ok } from '@utils/responses';
import { fetchScreenData, sendData } from './fetchScreenController';

import { getScreenWithUuid } from '../ScreenUtils';

jest.mock('../ScreenUtils');
jest.mock('@utils/responses');

const mockedOk = mocked(ok, true);
const mockedNotFound = mocked(notFound, true);
const mockedInternalServerError = mocked(internalServerError, true);
const mockedGetScreen = mocked(getScreenWithUuid, true);

describe('fetchScreenController', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: jest.Mock;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {};
        mockNext = jest.fn();

        jest.resetAllMocks();
    });

    describe('fetchScreenData', () => {
        test('Should add data to locals', async () => {
            mockRequest = {
                params: {
                    screenId: 'test'
                }
            };

            mockResponse = {
                locals: {}
            };

            const value = {
                uuid: 'id',
                stops: ['3000', '3001'],
                displayEnglish: true,
                displayFinnish: true,
                displaySwedish: true
            };

            mockedGetScreen.mockResolvedValueOnce(value);

            await fetchScreenData()(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockNext).toBeCalledTimes(1);
            expect(mockResponse.locals?.payload).toEqual(value);
        });

        test('Should return 404 when not found', async () => {
            mockRequest = {
                params: {
                    screenId: 'test'
                }
            };

            mockedGetScreen.mockResolvedValueOnce(null);

            await fetchScreenData()(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockedNotFound).toBeCalledTimes(1);
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('Should return 500 if anything fails', async () => {
            await fetchScreenData()(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockedInternalServerError).toBeCalledTimes(1);
            expect(mockNext).not.toHaveBeenCalled();
        });
    });

    describe('sendData', () => {
        test('Should send data in locals', async () => {
            mockResponse = {
                locals: {
                    payload: 'test'
                }
            };

            await sendData()(mockRequest as Request, mockResponse as Response);

            expect(mockedOk).toBeCalledTimes(1);
            expect(mockedOk).toBeCalledWith(mockRequest, mockResponse, 'test');
        });
    });
});
