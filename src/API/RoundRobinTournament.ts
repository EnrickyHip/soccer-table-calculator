import roundrobin, { type Rounds } from 'roundrobin-tournament-js';
import Tournament from './Tournament';
import Match from './Match';
import type RoundRobinTeam from './RoundRobinTeam';
import type { ClassificationInterface, Round, TieBreak } from './types';
import Classification from './Classification';
import RoundRobinSort from './RoundRobinSort';

export default class RoundRobinTournament extends Tournament {
  public readonly teams: RoundRobinTeam[];
  public readonly rounds: Round[];
  public readonly classification: Classification;
  private readonly sort: RoundRobinSort;

  constructor(
    teams: RoundRobinTeam[],
    secondRound: boolean,
    classification: ClassificationInterface,
    tieBreaks: TieBreak[],
  ) {
    super(teams, secondRound);
    this.teams = teams;
    this.classification = new Classification(classification);
    this.sort = new RoundRobinSort(tieBreaks);
    this.rounds = this.createRounds();
    this.sortTeams();
  }

  private createRounds(): Round[] {
    const rounds = roundrobin(this.teams, this.secondRound);
    return this.createMatches(rounds);
  }

  private createMatches(rounds: Rounds<RoundRobinTeam>): Round[] {
    return rounds.map((round: RoundRobinTeam[][]) => {
      return round.map((teams: RoundRobinTeam[]) => {
        const id = this.matches.length;
        const newMatch = Match.create(teams, id);
        this.matches.push(newMatch);
        return newMatch;
      });
    });
  }

  public sortTeams(): void {
    this.teams.sort(this.sort.compareTable);
    this.teams.forEach((team, index) => {
      team.setPosition(index + 1);
    });
  }
}
