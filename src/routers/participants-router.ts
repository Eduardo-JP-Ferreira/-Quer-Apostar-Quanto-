import { Router } from 'express';
import { participantSchema } from '../schemas';
import { validateBody } from '../middlewares/validation-middleware';
import participantsController from '../controllers/participants-controller';

const participantsRouter = Router();

participantsRouter
  .get('/participants', participantsController.getParticipants)
  .post(
    '/participants',
    validateBody(participantSchema),
    participantsController.postParticipant
  );

export { participantsRouter };
