import prisma from '../database';
import { BetBody, GameResultBody } from '../protocols';

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

async function updateFinishedBets(game: GameResultBody, id: number) {
  const { homeTeamScore, awayTeamScore } = game;

  const betsToUpdate = await prisma.bet.findMany({
    where: { gameId: id },
    include: { Participant: true },
  });

  const winningBets = betsToUpdate.filter((bet) => {
    return (
      bet.homeTeamScore === homeTeamScore && bet.awayTeamScore === awayTeamScore
    );
  });

  const winningBetsTotalAmount = winningBets.reduce(
    (total, bet) => total + bet.amountBet,
    0
  );

  const updatePromises = betsToUpdate.map(async (bet) => {
    let amountWon = 0;
    if (
      bet.homeTeamScore !== homeTeamScore ||
      bet.awayTeamScore !== awayTeamScore
    ) {
      amountWon = 0;
    } else if (winningBetsTotalAmount > 0) {
      amountWon = Math.floor(
        (bet.amountBet / winningBetsTotalAmount) *
        betsToUpdate.reduce((total, b) => total + b.amountBet, 0) *
        (1 - 0.3)
      );
    }

    await prisma.bet.update({
      where: { id: bet.id },
      data: {
        status: amountWon > 0 ? 'WON' : 'LOST',
        amountWon,
      },
    });

    await prisma.participant.update({
      where: { id: bet.participantId },
      data: {
        balance: {
          increment: amountWon,
        },
      },
    });
  });

  return Promise.all(updatePromises);
}

const betsRepository = {
  createBet,
  updateFinishedBets,
};

export default betsRepository;
