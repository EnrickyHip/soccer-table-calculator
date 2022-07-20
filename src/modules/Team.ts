import type Match from './Match';

interface Matches {
  [key: number]: Match;
}

export class Team {
  public readonly name: string;
  public readonly shield: string;
  private readonly matchesPlayedList: Matches = {};
  public readonly id: number;

  public wins = 0;
  public draws = 0;
  public losses = 0;
  public goals = 0;
  public counterGoals = 0;
  public points = 0;

  constructor(name: string, shield: string, id: number) {
    this.name = name;
    this.shield = shield;
    this.id = id;
  }

  // get points(): number {
  //   return this.wins * 3 + this.draws;
  // }

  get goalDifference(): number {
    return this.goals - this.counterGoals;
  }

  get matchesPlayed(): number {
    return Object.keys(this.matchesPlayedList).length;
  }

  get percentage(): number {
    return (this.points * 100) / (this.matchesPlayed * 3);
  }

  playMatch(match: Match): void {
    if (!match.score.homeTeam || !match.score.visitingTeam) {
      delete this.matchesPlayedList[match.id];
    } else {
      this.matchesPlayedList[match.id] = match;
    }

    this.updateInfo();
  }

  private updateInfo(): void {
    this.resetValues();

    Object.values(this.matchesPlayedList).forEach((match: Match) => {
      const selfScore = match.homeTeam.name === this.name
        ? match.score.homeTeam as number
        : match.score.visitingTeam as number;

      const otherScore = match.homeTeam.name === this.name
        ? match.score.visitingTeam as number
        : match.score.homeTeam as number;

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
