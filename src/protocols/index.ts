export type ParticipantBody = {
  name: string;
  balance: number;
};

export type GameBody = {
  homeTeamName: string;
  awayTeamName: string;
};

export type GameResultBody = {
  homeTeamScore: number;
  awayTeamScore: number;
};

export type BetBody = {
  homeTeamScore: number;
  awayTeamScore: number;
  amountBet: number;
  gameId: number;
  participantId: number;
}

export type ApplicationError = {
  name: string;
  message: string;
};