import prisma from '../../src/database';
import { faker } from '@faker-js/faker';

export async function createGame(homeTeamName: string, awayTeamName: string) {
  return await prisma.game.create({
    data: {
      homeTeamName,
      awayTeamName,
    },
  });
}

export async function createRandomGame() {
  const homeTeamName = faker.word.noun({ length: { min: 5, max: 7 }, strategy: "closest" })
  const awayTeamName = faker.word.noun({ length: { min: 5, max: 7 }, strategy: "closest" })

  return await createGame(homeTeamName, awayTeamName);
}
