import { Router } from 'express';

import { router as screenRouter } from './v1/screen';
import { router as stopsRouter } from './v1/stops';

const router = Router();

router.use('/screen', screenRouter);
router.use('/stops', stopsRouter);

export default router;
