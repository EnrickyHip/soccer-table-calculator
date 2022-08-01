import roundrobin, { type Rounds } from 'roundrobin-tournament-js';
import Tournament from './Tournament';
import Match from './Match';
import type RoundRobinTeam from './RoundRobinTeam';
import type { ClassificationInterface, RoundList } from './types/types';
import Classification from './Classification';

export default class RoundRobinTournament extends Tournament {
  public readonly teams: RoundRobinTeam[];
  public readonly rounds: RoundList;
  public readonly classification: Classification;

  constructor(teams: RoundRobinTeam[], secondRound: boolean, classification: ClassificationInterface) {
    super(teams, secondRound);
    this.teams = teams;
    this.classification = new Classification(classification);
    this.rounds = this.createRounds();
    this.sortTeams();
  }

  private createRounds(): RoundList {
    const rounds = roundrobin(this.teams, this.secondRound);
    return this.createMatches(rounds);
  }

  private createMatches(rounds: Rounds<RoundRobinTeam>): RoundList {
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
    this.teams.sort(RoundRobinTournament.compareTable);
    this.teams.forEach((team, index) => {
      // eslint-disable-next-line no-param-reassign
      team.position = index + 1;
    });
  }

  private static compareTable(team1: RoundRobinTeam, team2: RoundRobinTeam) {
    if (team1.points < team2.points) return 1; // 1 changes the position
    if (team1.points > team2.points) return -1; // -1 still the same

    if (team1.wins < team2.wins) return 1;
    if (team1.wins > team2.wins) return -1;

    if (team1.goalDifference < team2.goalDifference) return 1;
    if (team1.goalDifference > team2.goalDifference) return -1;

    if (team1.goals < team2.goals) return 1;
    if (team1.goals > team2.goals) return -1;

    if (team1.name < team2.name) return -1;
    if (team1.name > team2.name) return 1;
    return 0;
  }
}
