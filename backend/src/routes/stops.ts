import { Router } from 'express';

export const router = Router();

import {
    fetchStops,
    sendResponse
} from '../controllers/stops/fetchStopsController';

router.get('/', fetchStops(), sendResponse());
