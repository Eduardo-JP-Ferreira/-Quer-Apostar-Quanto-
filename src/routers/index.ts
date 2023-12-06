import { Router } from 'express';
import { participantsRouter } from './participants-router';
import { gamesRouter } from './games-router';
import { betsRouter } from './bets-router';

const router = Router();
router.use(participantsRouter);
router.use(gamesRouter);
router.use(betsRouter);

export default router;
