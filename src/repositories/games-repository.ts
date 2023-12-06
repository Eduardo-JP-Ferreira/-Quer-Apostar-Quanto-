import prisma from '../database';
import { GameBody, GameResultBody } from '../protocols';

async function findGames() {
  return prisma.game.findMany();
}

async function findGameById(id: number) {
  return prisma.game.findUnique({ where: { id } });
}

async function findGameWithBetById(id: number) {
  return prisma.game.findUnique({
    where: { id },
    include: {
      Bet: {
        where: { gameId: id },
      },
    },
  });
}

async function createGame(game: GameBody) {
  return prisma.game.create({
    data: {
      homeTeamName: game.homeTeamName,
      awayTeamName: game.awayTeamName,
      homeTeamScore: 0,
      awayTeamScore: 0,
      isFinished: false,
    },
  });
}

async function finishGame(game: GameResultBody, id: number) {
  return prisma.game.update({
    where: { id },
    data: {
      homeTeamScore: game.homeTeamScore,
      awayTeamScore: game.awayTeamScore,
      isFinished: true,
    },
  });
}

const gamesRepository = {
  findGames,
  findGameById,
  findGameWithBetById,
  createGame,
  finishGame,
};

export default gamesRepository;
