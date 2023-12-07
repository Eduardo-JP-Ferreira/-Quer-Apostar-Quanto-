import { Router } from 'express';
import { gameResultSchema, gameSchema } from '../schemas';
import { validateBody } from '../middlewares/validation-middleware';
import gamesController from '../controllers/games-controller';

const gamesRouter = Router();

gamesRouter
  .get('/games', gamesController.getGames)
  .get('/games/:id', gamesController.getGameById)
  .post('/games', validateBody(gameSchema), gamesController.postGame)
  .post(
    '/games/:id/finish',
    validateBody(gameResultSchema),
    gamesController.postGameResult
  );

export { gamesRouter };
