import { Request, Response, NextFunction } from 'express';

import { getScreenWithUuid } from '../ScreenUtils';
import * as responses from '@utils/responses';

export const fetchScreenData = () => {
    const middleware = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const uuid = req.params.screenId;
            const screenSettings = await getScreenWithUuid(uuid);

            if (!screenSettings) return responses.notFound(req, res);

            res.locals.payload = screenSettings;
            delete res.locals.payload.id;
            delete res.locals.payload.__v;

            next();
        } catch {
            return responses.internalServerError(req, res);
        }
    };

    return middleware;
};

export const sendData = () => {
    const middleware = async (req: Request, res: Response) => {
        responses.ok(req, res, res.locals.payload);
    };

    return middleware;
};
