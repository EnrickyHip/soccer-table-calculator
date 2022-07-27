import type Match from './Match';
import Team from './Team';
import type { Result } from './types/types';

export default class RoundRobinTeam extends Team {
  public wins = 0;
  public draws = 0;
  public losses = 0;
  public goals = 0;
  public counterGoals = 0;
  public position = 0;

  get points() {
    return this.wins * 3 + this.draws;
  }

  get goalDifference(): number {
    return this.goals - this.counterGoals;
  }

  get matchesPlayed(): number {
    return this.matchesPlayedArray.length;
  }

  get percentage(): number {
    if (this.points === 0) return 0;
    return (this.points * 100) / (this.matchesPlayed * 3);
  }

  private get matchesPlayedArray(): Match[] {
    return Object.values(this.matchesPlayedObject);
  }

  playMatch(match: Match): void {
    if (match.score.homeTeam === null || match.score.awayTeam === null) {
      delete this.matchesPlayedObject[match.id];
    } else {
      this.matchesPlayedObject[match.id] = match;
    }

    this.updateInfo();
  }

  getLastMatches(): Match[] {
    return this.matchesPlayedArray.slice(-5);
  }

  getLastResults(): Result[] {
    const lastMatches = this.getLastMatches();

    return lastMatches.map((match) => {
      const [selfScore, otherScore] = this.getSelfScore(match);

      if (selfScore > otherScore) return 'win';
      if (otherScore > selfScore) return 'lose';
      return 'draw';
    });
  }

  private getSelfScore(match: Match): number[] {
    const { score, homeTeam } = match;

    const selfScore = homeTeam.name === this.name
      ? score.homeTeam as number
      : score.awayTeam as number;

    const otherScore = homeTeam.name === this.name
      ? score.awayTeam as number
      : score.homeTeam as number;

    return [selfScore, otherScore];
  }

  private updateInfo(): void {
    this.resetValues();

    this.matchesPlayedArray.forEach((match: Match) => {
      this.calculateMatch(match);
    });
  }

  private calculateMatch(match: Match): void {
    const [selfScore, otherScore] = this.getSelfScore(match);

    this.goals += selfScore;
    this.counterGoals += otherScore;

    if (selfScore > otherScore) {
      this.wins += 1;
    } else if (otherScore > selfScore) {
      this.losses += 1;
    } else {
      this.draws += 1;
    }
  }

  private resetValues(): void {
    this.goals = 0;
    this.counterGoals = 0;
    this.wins = 0;
    this.draws = 0;
    this.losses = 0;
  }
}
