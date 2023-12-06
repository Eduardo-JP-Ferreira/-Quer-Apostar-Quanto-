import prisma from '../database';
import { ParticipantBody } from '../protocols';

async function findParticipants() {
  return prisma.participant.findMany();
}

async function findParticipantById(id: number) {
  return prisma.participant.findUnique({ where: { id } });
}

async function createParticipant(participant: ParticipantBody) {
  return prisma.participant.create({
    data: {
      name: participant.name,
      balance: participant.balance,
    },
  });
}

async function subBetMoney(id: number, balance: number) {
  return prisma.participant.update({
    where: { id },
    data: { balance },
  });
}

const participantsRepository = {
  findParticipants,
  findParticipantById,
  createParticipant,
  subBetMoney,
};

export default participantsRepository;
