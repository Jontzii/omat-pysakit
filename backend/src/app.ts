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

import v1Router from './routes/v1';

const app = express();
const port = parseInt(process.env.PORT || '8080');

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

app.get('/', (req: Request, res: Response) => res.status(200).send('OK'));
app.get(
    '/loaderio-402df015d9c7a2b274338d9358af2d1a',
    (req: Request, res: Response) =>
        res.status(200).send('loaderio-402df015d9c7a2b274338d9358af2d1a')
);

app.use('/v1', v1Router);
app.use((req: Request, res: Response) => notFound(req, res));
app.use(errorHandler());

app.listen(port, () => {
    Logger.info(`Omat naytot API listening on port ${port}`);
});
