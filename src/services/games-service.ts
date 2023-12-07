import { conflictError, notFoundError } from '../errors';
import { GameBody, GameResultBody } from '../protocols';
import betsRepository from '../repositories/bets-repository';
import gamesRepository from '../repositories/games-repository';

async function getGames() {
  return await gamesRepository.findGames();
}

async function getGameById(id: number) {
  return await gamesRepository.findGameWithBetById(id);
}

async function postGame(game: GameBody) {
  return await gamesRepository.createGame(game);
}

async function postGameResult(game: GameResultBody, id: number) {
  const gameFinish = await gamesRepository.findGameById(id);
  if (gameFinish.isFinished) throw conflictError('Game already finished');

  const finishGame = await gamesRepository.finishGame(game, id);
  if (!finishGame) throw notFoundError('Game not Found');

  await betsRepository.updateFinishedBets(game, id);

  return finishGame;
}

const gamesService = {
  getGames,
  getGameById,
  postGame,
  postGameResult,
};

export default gamesService;
