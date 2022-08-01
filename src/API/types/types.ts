import type Match from '../Match';

export type Round = Match[];
export type RoundList = Round[];
export type Goal = number | null;
export type Result = 'win' | 'draw' | 'lose';

export interface MatchesObject {
  [id: number]: Match;
}

export interface ScoreProtocol {
  homeTeam: Goal,
  awayTeam: Goal,
}

export interface MinMax {
  min: number;
  max: number;
}

export interface ClassificationInterface {
  classified1?: MinMax;
  classified2?: MinMax;
  classified3?: MinMax;
  playoff?: MinMax;
  relegated?: MinMax;
}
