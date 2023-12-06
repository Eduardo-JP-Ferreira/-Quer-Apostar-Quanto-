import Joi from 'joi';
import { GameBody, ParticipantBody } from '../protocols';

export const participantSchema = Joi.object<ParticipantBody>({
  name: Joi.string().required(),
  balance: Joi.number().required().min(1000),
});

export const gameSchema = Joi.object<GameBody>({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});
