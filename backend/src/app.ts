import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors, { CorsOptions } from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

import expressWinston from 'express-winston';
import Logger from './utils/logger';
import errorHandler from './utils/errorHandler';
import { getDatabaseUrl } from './utils/databaseConfig';
import { notFound } from './utils/responses';

import { router as screenRouter } from './routes/screen';
import { router as stopsRouter } from './routes/stops';

const app = express();
const port = 8080;

const corsOptions: CorsOptions = {
    // origin: process.env.FRONTEND_URL || 'http://localhost:3000'
    origin: '*'
};

mongoose
    .connect(getDatabaseUrl())
    .then(() => Logger.info('Mongo connection - OK'))
    .catch(() => Logger.error('Mongoose connection - Failed'));

app.use(
    expressWinston.logger({
        winstonInstance: Logger,
        msg: 'HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}',
        meta: false
    })
);
app.use(helmet());
app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/screen', screenRouter);
app.use('/api/stops', stopsRouter);
app.use((req: Request, res: Response) => notFound(req, res));
app.use(errorHandler());

app.listen(port, () => {
    Logger.info(`Omat-naytot API listening at port ${port}`);
});
