import Score from './Score';
import type Team from './Team';
import type { Goal } from './types/types';

export default class Match {
  public readonly id: number;
  public readonly homeTeam: Team;
  public score = new Score(this);
  public readonly awayTeam: Team;

  constructor(homeTeam: Team, awayTeam: Team, id: number) {
    this.id = id;
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
  }

  static create(teams: Team[], id: number): Match {
    const homeTeam = teams[0];
    const visitingTeam = teams[1];
    return new Match(homeTeam, visitingTeam, id);
  }

  play(homeGoals: Goal, awayGoals: Goal): void {
    if (this.score.homeTeam === homeGoals && this.score.awayTeam === awayGoals) return;

    this.score.set(homeGoals, awayGoals);

    this.homeTeam.playMatch(this);
    this.awayTeam.playMatch(this);
  }
}
