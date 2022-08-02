import type Match from '../Match';
import type RoundRobinTeam from '../RoundRobinTeam';

/* criará um novo tipo com todas as chaves que forem do tipo passado como parâmetro
[Key in keyof Object] -> faz uma iteração entre todas as chaves do objeto
Object[Key] extends Type ? Key : never -> é uma condição ternária, se o valor da chave for do tipo informado,
a chave será incluida com esse tipo, caso não, a chave não é incluida.
  [keyof Object] no final retorna apenas as CHAVES.
  */
type KeysType<Object, Type> = {
  [Key in keyof Object]: Object[Key] extends Type ? Key : never
}[keyof Object];

export type Round = Match[];
export type Goal = number | null;
export type Result = 'win' | 'draw' | 'lose';
export type TieBreak = 'wins' | 'goalDifference' | 'goals' | 'head-to-head';
export type SortableAttribute = KeysType<RoundRobinTeam, number>;

export interface MatchesObject {
  [id: number]: Match;
}

export interface MinMax {
  min: number;
  max: number;
}

export interface ScoreProtocol {
  homeTeam: Goal,
  awayTeam: Goal,
}

export interface ClassificationInterface {
  classified1?: MinMax;
  classified2?: MinMax;
  classified3?: MinMax;
  playoff?: MinMax;
  relegated?: MinMax;
}
