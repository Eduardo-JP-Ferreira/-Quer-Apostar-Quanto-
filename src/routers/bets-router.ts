import { Router } from 'express';
import { betSchema } from '../schemas';
import { validateBody } from '../middlewares/validation-middleware';
import betsController from '../controllers/bets-controller';

const betsRouter = Router();

betsRouter.post('/bets', validateBody(betSchema), betsController.postbet);

export { betsRouter };
