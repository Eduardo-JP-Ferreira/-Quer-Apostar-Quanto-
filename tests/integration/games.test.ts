import httpStatus from 'http-status';
import supertest from 'supertest';
import app from '../../src';
import prisma from '../../src/database';
import { createRandomGame } from '../factories/games-factory';
import { cleanDb } from '../ultis';

const server = supertest(app);

beforeAll(async () => {
  await cleanDb()
});

beforeEach(async () => {
  await cleanDb()
});

describe('GET /games', () => {
  it('should respond with all the games and with status 200 ', async () => {
    await createRandomGame();
    await createRandomGame();

    const response = await server.get('/games');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toHaveLength(2);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          homeTeamName: expect.any(String),
          awayTeamName: expect.any(String),
          isFinished: false,
          homeTeamScore: 0,
          awayTeamScore: 0,
        }),
      ])
    );
  });

  it('should respond with [] and with status 200 when there is no game', async () => {
    const response = await server.get('/games');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toHaveLength(0);
  });
});

describe('GET /games/:id', () => {
  it('should respond with the rigth game and with status 200 ', async () => {
    await createRandomGame();
    const game = await createRandomGame();

    const response = await server.get(`/games/${game.id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: game.id,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        homeTeamName: expect.any(String),
        awayTeamName: expect.any(String),
        isFinished: false,
        homeTeamScore: 0,
        awayTeamScore: 0,
        Bet: []
      }),
    );
  });

  it('should respond with [] and with status 200 when there is no game', async () => {
    const response = await server.get('/games');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toHaveLength(0);
  });

  it('should respond with status 404 when there is no game with the id', async () => {
    const game = await createRandomGame();

    const response = await server.get(`/games/${game.id + 1}`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
});

describe('POST /games', () => {
  it('should create a game ', async () => {
    const response = await server.post('/games').send({
      homeTeamName: 'cruzeiro',
      awayTeamName: 'vasco',
    });

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        homeTeamName: 'cruzeiro',
        awayTeamName: 'vasco',
        isFinished: false,
        homeTeamScore: 0,
        awayTeamScore: 0,
      }),
    );
  });

  it('should not create a game', async () => {
    const response = await server.post('/games');

    expect(response.status).toBe(httpStatus.BAD_REQUEST);

    const games = await prisma.game.findMany();
    expect(games).toHaveLength(0);
  });
});

