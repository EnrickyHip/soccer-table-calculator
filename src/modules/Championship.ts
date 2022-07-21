import type Match from './Match';
import type Team from './Team';

export default abstract class Championship {
  public readonly teams: Team[];
  public readonly matches: Match[] = [];
  protected readonly homeAway: boolean;

  constructor(teams: Team[], homeAway: boolean) {
    this.teams = teams;
    this.homeAway = homeAway;
  }
}
