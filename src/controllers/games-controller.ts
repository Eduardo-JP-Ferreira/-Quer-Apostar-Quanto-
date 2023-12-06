import { Request, Response } from 'express';
import httpStatus from 'http-status';
import gamesService from '../services/games-service';

async function getGames(req: Request, res: Response) {
  try {
    const games = await gamesService.getGames();
    return res.status(httpStatus.OK).send(games);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function getGameById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const game = await gamesService.getGameById(Number(id));
    return res.status(httpStatus.OK).send(game);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function postGame(req: Request, res: Response) {
  const { homeTeamName, awayTeamName } = req.body;

  try {
    const game = await gamesService.postGame({ homeTeamName, awayTeamName });
    return res.status(httpStatus.CREATED).send(game);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

const gamesController = {
  getGames,
  getGameById,
  postGame,
};

export default gamesController;
