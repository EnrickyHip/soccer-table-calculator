import type Team from './Team';
import type { Score, Goal } from './types/types';

export default class Match {
  public readonly id: number;
  public readonly homeTeam: Team;
  public score: Score = { homeTeam: null, awayTeam: null };
  public readonly awayTeam: Team;

  constructor(homeTeam: Team, awayTeam: Team, id: number) {
    this.id = id;
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
  }

  play(homeGoals: Goal, awayGoals: Goal): void {
    if (this.score.homeTeam === homeGoals && this.score.awayTeam === awayGoals) return;

    this.score = {
      homeTeam: homeGoals,
      awayTeam: awayGoals,
    };

    this.homeTeam.playMatch(this);
    this.awayTeam.playMatch(this);
  }
}
