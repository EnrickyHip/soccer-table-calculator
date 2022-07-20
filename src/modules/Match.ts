import type { Team } from './Team';

interface Score {
  homeTeam: number | null,
  visitingTeam: number | null,
}

export default class Match {
  public readonly id: number;
  public readonly homeTeam: Team;
  public score: Score = { homeTeam: null, visitingTeam: null };
  public readonly visitingTeam: Team;

  constructor(homeTeam: Team, visitingTeam: Team, id: number) {
    this.homeTeam = homeTeam;
    this.visitingTeam = visitingTeam;
    this.id = id;
  }

  play(homeGoals: number, visitingGoals: number): void {
    if (this.score.homeTeam === homeGoals && this.score.visitingTeam === visitingGoals) return;

    this.score = {
      homeTeam: homeGoals,
      visitingTeam: visitingGoals,
    };

    this.homeTeam.playMatch(this);
    this.visitingTeam.playMatch(this);
  }
}
