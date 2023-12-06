import prisma from '../database';
import { BetBody } from '../protocols';

async function createBet(bet: BetBody) {
  return prisma.bet.create({
    data: {
      homeTeamScore: bet.homeTeamScore,
      awayTeamScore: bet.awayTeamScore,
      amountBet: bet.amountBet,
      gameId: bet.gameId,
      participantId: bet.participantId,
      status: 'PENDING',
      amountWon: null,
    },
  });
}

const betsRepository = {
  createBet,
};

export default betsRepository;
