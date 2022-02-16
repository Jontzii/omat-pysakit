import { Request, Response } from 'express';
import { mocked } from 'jest-mock';
import { internalServerError, ok } from '@utils/responses';
import { fetchStops, sendResponse } from './fetchStopsController';
import { getStops } from './fetchStopsUtils';

jest.mock('@utils/responses');
jest.mock('./fetchStopsUtils');

const mockedOk = mocked(ok, true);
const mockedInternalServerError = mocked(internalServerError, true);
const mockedGetStops = mocked(getStops, true);

describe('fetchStopsController', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: jest.Mock;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {};
        mockNext = jest.fn();

        jest.resetAllMocks();
    });

    describe('fetchStops', () => {
        test('Should set stops to locals', async () => {
            mockResponse = {
                locals: {}
            };

            mockedGetStops.mockResolvedValueOnce(['test:3001', 'test:3002']);

            await fetchStops()(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockResponse.locals?.stops).toEqual([
                'test:3001',
                'test:3002'
            ]);
            expect(mockNext).toBeCalledTimes(1);
        });

        test('Should respond with 500 in case of error', async () => {
            mockedGetStops.mockImplementationOnce(() => {
                throw new Error();
            });

            await fetchStops()(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockedInternalServerError).toBeCalledTimes(1);
        });
    });

    describe('sendResponse', () => {
        test('Should send data in locals', async () => {
            mockResponse = {
                locals: {
                    stops: 'test'
                }
            };

            await sendResponse()(
                mockRequest as Request,
                mockResponse as Response
            );

            expect(mockedOk).toBeCalledTimes(1);
            expect(mockedOk).toBeCalledWith(mockRequest, mockResponse, 'test');
        });
    });
});
