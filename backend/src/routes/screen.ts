import { Router } from 'express';

import {
    validateBody,
    checkStops,
    saveData,
    sendResponse
} from '../controllers/screen/saveScreenController';

import {
    fetchScreenData,
    sendData
} from '../controllers/screen/fetchScreenController';

export const router = Router();

/**
 * Create a new stop screen
 */
router.post('/', validateBody(), checkStops(), saveData(), sendResponse());

/**
 * Get data for a previously created stop screen
 */
router.get('/:screenId', fetchScreenData(), sendData());
