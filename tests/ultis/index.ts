import prisma from "../../src/database";

export async function cleanDb() {
  await prisma.participant.deleteMany();
  await prisma.game.deleteMany();
  await prisma.bet.deleteMany();
}