import { Request, Response, NextFunction } from 'express';

import * as responses from '../../utils/responses';
import { getStops } from './fetchStopsUtils';

/**
 * Fetch data for stops
 * @returns
 */
export const fetchStops = () => {
    const middleware = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            res.locals.stops = await getStops();
            next();
        } catch {
            return responses.internalServerError(req, res);
        }
    };
    return middleware;
};

/**
 * Send res.locals.stops to user
 * @returns
 */
export const sendResponse = () => {
    const middleware = async (req: Request, res: Response) => {
        responses.ok(req, res, res.locals.stops);
    };
    return middleware;
};
