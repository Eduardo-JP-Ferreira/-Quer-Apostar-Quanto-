import { Router } from 'express';
import { participantsRouter } from './participants-router';
import { gamesRouter } from './games-router';

const router = Router();
router.use(participantsRouter);
router.use(gamesRouter);

export default router;
