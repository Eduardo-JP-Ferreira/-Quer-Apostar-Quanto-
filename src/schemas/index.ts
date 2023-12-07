import Joi from 'joi';
import { BetBody, GameBody, GameResultBody, ParticipantBody } from '../protocols';

export const participantSchema = Joi.object<ParticipantBody>({
  name: Joi.string().required(),
  balance: Joi.number().required().min(1000),
});

export const gameSchema = Joi.object<GameBody>({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});

export const gameResultSchema = Joi.object<GameResultBody>({
  homeTeamScore: Joi.number().required(),
  awayTeamScore: Joi.number().required(),
})

export const betSchema = Joi.object<BetBody>({
  homeTeamScore: Joi.number().required(),
  awayTeamScore: Joi.number().required(),
  amountBet: Joi.number().required(),
  gameId: Joi.number().required(),
  participantId: Joi.number().required(),
});
