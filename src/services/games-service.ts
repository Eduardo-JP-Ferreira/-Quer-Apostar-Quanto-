import { GameBody } from '../protocols';
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
const gamesService = {
  getGames,
  getGameById,
  postGame,
};

export default gamesService;
