import httpStatus from 'http-status';
import supertest from 'supertest';
import app from '../../src';
import prisma from '../../src/database';
import { createParticipant } from '../factories/participants-factory';
import { cleanDb } from '../ultis';
import { createRandomGame } from '../factories/games-factory';

const server = supertest(app);

beforeAll(async () => {
  await cleanDb()
});

beforeEach(async () => {
  await cleanDb();
});

describe('GET /participant', () => {
  it('should finish game ', async () => {
    const game = await createRandomGame();
    const joao = await createParticipant("Joao", 3000);
    const maria = await createParticipant("Maria", 3000);
    const jose = await createParticipant("Jose", 3000);

    await server.post('/bets').send({
      homeTeamScore: 2,
      awayTeamScore: 2,
      amountBet: 1000,
      gameId: game.id,
      participantId: joao.id,
    });

    await server.post('/bets').send({
      homeTeamScore: 2,
      awayTeamScore: 2,
      amountBet: 2000,
      gameId: game.id,
      participantId: maria.id,
    });

    await server.post('/bets').send({
      homeTeamScore: 3,
      awayTeamScore: 1,
      amountBet: 3000,
      gameId: game.id,
      participantId: jose.id,
    });

    const response = await server.post(`/games/${game.id}/finish`).send({
      homeTeamScore: 2,
      awayTeamScore: 2
    });

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: game.id,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        homeTeamName: expect.any(String),
        awayTeamName: expect.any(String),
        isFinished: true,
        homeTeamScore: 2,
        awayTeamScore: 2,
      }),
    );
  });
});
