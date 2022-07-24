import type Match from './Match';
import Team from './Team';

export default class RoundRobinTeam extends Team {
  public wins = 0;
  public draws = 0;
  public losses = 0;
  public goals = 0;
  public counterGoals = 0;
  public index = 0;

  get points(): number {
    return this.wins * 3 + this.draws;
  }

  get goalDifference(): number {
    return this.goals - this.counterGoals;
  }

  get matchesPlayed(): number {
    return Object.keys(this.matchesPlayedList).length;
  }

  get percentage(): number {
    if (this.points === 0) return 0;
    return (this.points * 100) / (this.matchesPlayed * 3);
  }

  playMatch(match: Match): void {
    if (match.score.homeTeam === null || match.score.awayTeam === null) {
      delete this.matchesPlayedList[match.id];
    } else {
      this.matchesPlayedList[match.id] = match;
    }

    this.updateInfo();
  }

  private updateInfo(): void {
    this.resetValues();

    const matchesPlayedArray = Object.values(this.matchesPlayedList);

    matchesPlayedArray.forEach((match: Match) => {
      const { score, homeTeam } = match;

      const selfScore = homeTeam.name === this.name
        ? score.homeTeam as number
        : score.awayTeam as number;

      const otherScore = homeTeam.name === this.name
        ? score.awayTeam as number
        : score.homeTeam as number;

      this.goals += selfScore;
      this.counterGoals += otherScore;

      if (selfScore > otherScore) {
        this.wins += 1;
      } else if (otherScore > selfScore) {
        this.losses += 1;
      } else {
        this.draws += 1;
      }
    });
  }

  private resetValues(): void {
    this.goals = 0;
    this.counterGoals = 0;
    this.wins = 0;
    this.draws = 0;
    this.losses = 0;
  }
}
