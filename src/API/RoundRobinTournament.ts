import roundrobin from 'roundrobin';
import { shuffle } from './utils/shuffle';
import Tournament from './Tournament';
import Match from './Match';
import type RoundRobinTeam from './RoundRobinTeam';
import type { ClassificationInterface, RoundList, RoundRobin } from './types/types';
import Classification from './Classification';

export default class RoundRobinTournament extends Tournament {
  public readonly teams: RoundRobinTeam[];
  public readonly rounds: RoundList;
  public readonly classification: Classification;

  constructor(teams: RoundRobinTeam[], homeAway: boolean, classification: ClassificationInterface) {
    super(teams, homeAway);
    this.teams = teams;
    this.classification = new Classification(classification);
    this.rounds = this.createRounds();
    this.sortTeams();
  }

  private createRounds(): RoundList {
    let rounds: RoundRobin = roundrobin(this.teams.length, this.teams);
    rounds = shuffle(rounds);

    if (this.homeAway) {
      rounds = RoundRobinTournament.generateSecondHalf(rounds);
    }

    return this.createMatches(rounds);
  }

  private createMatches(rounds: RoundRobin): RoundList {
    return rounds.map((round: RoundRobinTeam[][]) => {
      const shuffledRound = shuffle(round);

      return shuffledRound.map((teams: RoundRobinTeam[]) => {
        const id = this.matches.length;
        const newMatch = Match.create(teams, id);
        this.matches.push(newMatch);
        return newMatch;
      });
    });
  }

  private static generateSecondHalf(firstHalf: RoundRobin): RoundRobin {
    const secondHalf = firstHalf.map((round) => {
      return round.map((match) => {
        const newMatch = [...match];
        newMatch.reverse();
        return newMatch;
      });
    });

    return [...firstHalf, ...secondHalf];
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
