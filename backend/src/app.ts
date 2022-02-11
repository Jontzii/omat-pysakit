import express, { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors, { CorsOptions } from 'cors';
import 'dotenv/config';

import Logger from './utils/logger';

const app = express();
const port = 8080;

const corsOptions: CorsOptions = {
    // origin: process.env.FRONTEND_URL || 'http://localhost:3000'
    origin: '*'
};

app.use(morgan('short'));
app.use(helmet());
app.use(express.json());
app.use(cors(corsOptions));

app.get('/', (req: Request, res: Response) =>
    res.send('<h1>API boilerplate</h1>')
);

app.listen(port, () => {
    Logger.info(`Get A Room! API listening at port ${port}`);
});
