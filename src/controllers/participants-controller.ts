import { Request, Response } from 'express';
import httpStatus from 'http-status';
import participantsService from '../services/participants-service';

async function getParticipants(req: Request, res: Response) {
  try {
    const participants = await participantsService.getParticipants();
    return res.status(httpStatus.OK).send(participants);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function postParticipant(req: Request, res: Response) {
  const { name, balance } = req.body;

  try {
    const participant = await participantsService.postParticipant({
      name,
      balance,
    });
    return res.status(httpStatus.CREATED).send(participant);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

const participantsController = {
  getParticipants,
  postParticipant,
};

export default participantsController;
