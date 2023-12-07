import httpStatus from 'http-status';
import supertest from 'supertest';
import app from '../../src';
import prisma from '../../src/database';
import { cleanDb } from '../ultis';
import { createRandomParticipant } from '../factories/participants-factory';
import { createRandomGame } from '../factories/games-factory';

const server = supertest(app);

beforeAll(async () => {
  await cleanDb()
});

beforeEach(async () => {
  await cleanDb();
});

describe('POST /bets', () => {
  it('should create a game ', async () => {
    const participant = await createRandomParticipant();
    const game = await createRandomGame();
    const response = await server.post('/bets').send({
      homeTeamScore: 1,
      awayTeamScore: 1,
      amountBet: 1000,
      gameId: game.id,
      participantId: participant.id,
    });

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        homeTeamScore: 1,
        awayTeamScore: 1,
        amountBet: 1000,
        gameId: game.id,
        participantId: participant.id,
        amountWon: null,
      })
    );
  });

  it('should not create a bet', async () => {
    const response = await server.post('/bets');

    expect(response.status).toBe(httpStatus.BAD_REQUEST);

    const bets = await prisma.bet.findMany();
    expect(bets).toHaveLength(0);
  });
});
