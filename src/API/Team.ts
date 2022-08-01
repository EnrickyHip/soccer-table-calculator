import type Match from './Match';
import type { MatchesObject } from './types';

export default abstract class Team {
  public readonly id: number;
  public readonly name: string;
  public readonly shield: string;
  protected readonly matchesPlayedObject: MatchesObject = {};

  constructor(name: string, shield: string, id: number) {
    this.name = name;
    this.shield = shield;
    this.id = id;
  }

  get matches(): Match[] {
    return Object.values(this.matchesPlayedObject);
  }

  public goalsInMatches(matches: Match[]): number {
    return matches.reduce((goals: number, match) => {
      const { score } = match;
      const [selfScore] = score.getTeamScore(this);
      return goals + selfScore;
    }, 0);
  }

  static getMatchesBetween(team1: Team, team2: Team): Match[] {
    return team1.matches.filter((match: Match) => {
      const { homeTeam, awayTeam } = match;
      return (homeTeam === team1 && awayTeam === team2) || (homeTeam === team2 && awayTeam === team1);
    });
  }

  static headToHeadGoals(team1: Team, team2: Team): number[] {
    const matches = Team.getMatchesBetween(team1, team2);
    const team1Goals = team1.goalsInMatches(matches);
    const team2Goals = team2.goalsInMatches(matches);
    return [team1Goals, team2Goals];
  }

  abstract playMatch(match: Match): void;
}
