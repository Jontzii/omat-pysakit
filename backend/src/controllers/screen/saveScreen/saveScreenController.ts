import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';

import { randomUUID } from 'crypto';

import ScreenSettings from '@definitions/screenSettings';
import Logger from '@utils/logger';
import { getStops } from '@controllers/stops/fetchStopsUtils';
import { createAndSaveScreen } from '../ScreenUtils';
import {
    validateLanguages,
    checkTimePerLanguage,
    checkColumns,
    checkRows
} from './saveScreenUtils';

import * as responses from '@utils/responses';

/**
 * Validate values given in body
 * @returns
 */
export const validateBody = () => {
    const middleware = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            // Form correct form of stopIds
            const stops: string[] = req.body.stops;

            const payload: ScreenSettings = {
                uuid: randomUUID(),
                stops,
                ...validateLanguages(req.body.languages),
                ...checkTimePerLanguage(req.body.languageTime),
                ...checkColumns(req.body.columns),
                ...checkRows(req.body.rows)
            };

            res.locals.payload = payload;
            next();
        } catch {
            responses.badRequest(req, res);
        }
    };

    return middleware;
};

/**
 * Check from API that the given stops exist
 * @returns
 */
export const checkStops = () => {
    const middleware = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const stops: string[] = res.locals.payload.stops;
            const allStops = await getStops();
            const stopIds = _.map(allStops, (val) => val.gtfsId);

            if (!_.every(stops, (stopId) => _.includes(stopIds, stopId))) {
                Logger.warn(
                    'One or more stops could not be found from the list of stops'
                );
                return responses.badRequest(req, res);
            }

            next();
        } catch {
            responses.internalServerError(req, res);
        }
    };

    return middleware;
};

/**
 * Save the data to Mongo
 * @returns
 */
export const saveData = () => {
    const middleware = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            createAndSaveScreen(res.locals.payload);
            next();
        } catch {
            return responses.internalServerError(req, res);
        }
    };

    return middleware;
};

/**
 * Send the response
 * @returns
 */
export const sendResponse = () => {
    const middleware = async (req: Request, res: Response) => {
        // Send the payload in the response
        responses.created(req, res, res.locals.payload);
    };

    return middleware;
};
