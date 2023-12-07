import httpStatus from 'http-status';
import supertest from 'supertest';
import app from '../../src';
import prisma from '../../src/database';
import {
  createParticipant,
  createRandomParticipant,
} from '../factories/participants-factory';

const server = supertest(app);

beforeEach(async () => {
  await prisma.participant.deleteMany();
});

describe('GET /participant', () => {
  it('should respond with all the participants and with status 200 ', async () => {
    await createRandomParticipant();
    await createRandomParticipant();
    await createRandomParticipant();
    await createRandomParticipant();

    const response = await server.get('/participants');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toHaveLength(4);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          balance: expect.any(Number),
        }),
      ])
    );
  });

  it('should respond with [] and with status 200 when there is no participant', async () => {
    const response = await server.get('/participants');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toHaveLength(0);
  });
});

describe('POST /participant', () => {
  it('should create a participant ', async () => {
    const response = await server.post('/participants').send({
      name: 'joao',
      balance: 3000,
    });

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        name: 'joao',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        balance: 3000,
      })
    );
  });

  it('should not create a participant when balance < 1000', async () => {
    const response = await server.post('/participants').send({
      name: 'joao',
      balance: 800,
    });
    expect(response.status).toBe(httpStatus.BAD_REQUEST);

    const participants = await prisma.participant.findMany();
    expect(participants).toHaveLength(0);
  });
});
