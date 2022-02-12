import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';

import { randomUUID } from 'crypto';

import ScreenSettings from '../../types/screenSettings';
import Logger from '../../utils/logger';
import * as responses from '../../utils/responses';
import { getStops } from '../stops/fetchStopsUtils';
import { createAndSaveScreen } from './ScreenUtils';

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
            const langs: string[] = req.body.languages;

            // 1 - 3 languages can selected
            if (langs.length < 1 || langs.length > 3) {
                Logger.warn('Incorrect amount of languages given');
                return responses.badRequest(req, res);
            }

            // Only 3 different values allowed
            if (
                !_.every(langs, (value) =>
                    _.includes(['fi', 'sv', 'en'], value)
                )
            ) {
                Logger.warn('Incorrect language given');
                return responses.badRequest(req, res);
            }

            // Check for duplicates
            if (new Set(langs).size !== langs.length) {
                Logger.warn('Languages contained duplicates');
                return responses.badRequest(req, res);
            }

            const payload: ScreenSettings = {
                uuid: randomUUID(),
                stops,
                displayFinnish: langs.includes('fi'),
                displaySwedish: langs.includes('sv'),
                displayEnglish: langs.includes('en')
            };

            // Check language time
            if (req.body.languageTime && req.body.languageTime > 0) {
                payload.languageTime = req.body.languageTime;
            } else {
                payload.languageTime = 8;
            }

            // Check columns
            if (req.body.columns && req.body.columns > 0) {
                payload.columns = req.body.columns;
            } else {
                payload.columns = 1;
            }

            // Check rows
            if (req.body.rows && req.body.rows > 0) {
                payload.rows = req.body.rows;
            } else {
                payload.rows = 8;
            }

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
