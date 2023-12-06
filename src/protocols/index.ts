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
