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

const { DIGITRANSIT_AREA } = process.env;

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
            const stops: string[] = _.map(
                req.body.stops,
                (stopId: string) => `${DIGITRANSIT_AREA}:${stopId}`
            );

            // Check the set languages
            const langs = validateLanguages(req.body.languages);

            const payload: ScreenSettings = {
                uuid: randomUUID(),
                stops,
                ...langs,
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
        const stops: string[] = res.locals.payload.stops;
        const allStops = await getStops();

        if (!_.every(stops, (stopId) => _.includes(allStops, stopId))) {
            Logger.warn(
                'One or more stops could not be found from the list of stops'
            );
            return responses.badRequest(req, res);
        }

        next();
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

export const sendResponse = () => {
    const middleware = (req: Request, res: Response) => {
        // Send the payload in the response
        responses.created(req, res, res.locals.payload);
    };

    return middleware;
};
