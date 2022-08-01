import type Match from './Match';
import type Team from './Team';

export default abstract class Tournament {
  public readonly teams: Team[];
  public readonly matches: Match[] = [];
  protected readonly secondRound: boolean;

  constructor(teams: Team[], secondRound: boolean) {
    this.teams = teams;
    this.secondRound = secondRound;
  }
}
