import roundrobin from 'roundrobin';
import { shuffle } from '../utils/shuffle';
import Championship from './Championship';
import Match from './Match';
import type RoundRobinTeam from './RoundRobinTeam';

export type Round = Match[];
export type RoundList = Round[];
type RoundRobin = RoundRobinTeam[][][];

export default class RoundRobinTournament extends Championship {
  public readonly teams: RoundRobinTeam[];
  public readonly rounds: RoundList;

  constructor(teams: RoundRobinTeam[], homeAway: boolean) {
    super(teams, homeAway);
    this.rounds = this.createRounds();
    this.sortTeams();
  }

  private createRounds(): RoundList {
    let rounds: RoundRobin = roundrobin(this.teams.length, this.teams);

    if (this.homeAway) {
      rounds = this.generateSecondHalf(rounds);
    }

    return this.createMatches(rounds);
  }

  private createMatches(rounds: RoundRobin): RoundList {
    const roundsWithMatches = rounds.map((round: RoundRobinTeam[][]) => {
      const shuffledRound = shuffle(round);

      const newRound = shuffledRound.map((match: RoundRobinTeam[]) => {
        const homeTeam = match[0];
        const visitingTeam = match[1];
        const id = this.matches.length;

        const newMatch = new Match(homeTeam, visitingTeam, id);
        this.matches.push(newMatch);
        return newMatch;
      });

      return newRound;
    });

    return roundsWithMatches;
  }

  private generateSecondHalf(firstHalf: RoundRobin): RoundRobin {
    const secondHalf: RoundRobin = roundrobin(this.teams.length, this.teams);

    secondHalf.forEach((round: RoundRobinTeam[][]) => {
      round.forEach((match: RoundRobinTeam[]) => {
        match.reverse();
      });
    });

    return [...firstHalf, ...secondHalf];
  }

  public sortTeams(): void {
    this.teams.sort(RoundRobinTournament.compareTable);
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
