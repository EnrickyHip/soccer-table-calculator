import Match from '../Match';
import RoundRobinTeam from '../RoundRobinTeam';

export type Round = Match[];
export type RoundList = Round[];
export type RoundRobin = RoundRobinTeam[][][];
export type Goal = number | null;
export type Result = 'win' | 'draw' | 'lose';

export interface MatchesList {
  [key: number]: Match;
}

export interface Score {
  homeTeam: Goal,
  awayTeam: Goal,
}
