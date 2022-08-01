import type Match from './Match';
import type Team from './Team';
import type { Goal, ScoreProtocol } from './types/types';

export default class Score implements ScoreProtocol {
  public homeTeam: Goal = null;
  public awayTeam: Goal = null;
  private match: Match;

  constructor(match: Match) {
    this.match = match;
  }

  set(homeGoals: Goal, awayGoals: Goal) {
    this.homeTeam = homeGoals;
    this.awayTeam = awayGoals;
  }

  getTeamScore(team: Team): number[] {
    const { homeTeam } = this.match;

    const selfScore = homeTeam.name === team.name
      ? this.homeTeam as number
      : this.awayTeam as number;

    const otherScore = homeTeam.name === team.name
      ? this.awayTeam as number
      : this.homeTeam as number;

    return [selfScore, otherScore];
  }
}
