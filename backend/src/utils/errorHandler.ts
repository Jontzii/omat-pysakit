/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import logger from './logger';

import { internalServerError } from './responses';

const errorHandler = () => {
    const middleware = (
        error: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        logger.error(error.message);
        internalServerError(req, res);
    };

    return middleware;
};

export default errorHandler;
