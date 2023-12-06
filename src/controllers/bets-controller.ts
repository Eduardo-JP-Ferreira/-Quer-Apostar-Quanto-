import { Request, Response } from 'express';
import httpStatus from 'http-status';
import betsService from '../services/bets-service';

async function postbet(req: Request, res: Response) {
  const { homeTeamScore, awayTeamScore, amountBet, gameId, participantId } =
    req.body;

  try {
    const bet = await betsService.postbet({
      homeTeamScore,
      awayTeamScore,
      amountBet,
      gameId,
      participantId,
    });
    return res.status(httpStatus.CREATED).send(bet);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    } else if (error.name === 'UnauthorizedError') {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

const betsController = {
  postbet,
};

export default betsController;
