import prisma from '../../src/database';
import { faker } from '@faker-js/faker';

export async function createParticipant(name: string, balance: number) {
  return await prisma.participant.create({
    data: {
      name,
      balance,
    },
  });
}

export async function createRandomParticipant() {
  const name = faker.person.firstName();
  const balance = faker.number.int({ min: 1000, max: 1000000 });

  return createParticipant(name, balance);
}
