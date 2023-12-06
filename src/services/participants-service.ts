import { ParticipantBody } from "../protocols";
import participantsRepository from "../repositories/participants-repository";

async function getParticipants() {
    return await participantsRepository.findParticipants()   
}

async function postParticipant(participant: ParticipantBody) {
    return await participantsRepository.createParticipant(participant)   
}

const participantsService = {
    getParticipants,
    postParticipant
};
  
export default participantsService;