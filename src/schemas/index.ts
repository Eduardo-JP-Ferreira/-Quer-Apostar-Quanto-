import Joi from "joi";
import { ParticipantBody } from "../protocols";

export const participantSchema = Joi.object<ParticipantBody>({
	name: Joi.string().required(),
	balance: Joi.number().required().min(1000)
})