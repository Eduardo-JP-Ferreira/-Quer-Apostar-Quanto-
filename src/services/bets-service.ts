import { notFoundError, unauthorizedError } from '../errors';
import { BetBody } from '../protocols';
import betsRepository from '../repositories/bets-repository';
import gamesRepository from '../repositories/games-repository';
import participantsRepository from '../repositories/participants-repository';

async function postbet(bet: BetBody) {
  const game = await gamesRepository.findGameById(bet.gameId);
  const participant = await participantsRepository.findParticipantById(
    bet.participantId
  );

  if (!participant || !game)
    throw notFoundError('Game or Participant not Found');
  if (participant.balance < bet.amountBet)
    throw unauthorizedError('Insufficient funds');
  if (game.isFinished) throw unauthorizedError('Game already finished');

  const createBet = await betsRepository.createBet(bet);
  const curentMoney = participant.balance - createBet.amountBet;

  if (createBet)
    await participantsRepository.subBetMoney(participant.id, curentMoney);

  return createBet;
}

const betsService = {
  postbet,
};

export default betsService;
