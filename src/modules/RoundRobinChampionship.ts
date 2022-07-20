import roundrobin from 'roundrobin';
import { shuffle } from '../utils/shuffle';
import Championship from './Championship';
import Match from './Match';
import { Team } from './Team';

type Round = Match[];
export type Rounds = Round[];
type RoundRobin = Team[][][];

export default class RoundRobinTournament extends Championship {
  public readonly teams: Team[];
  public readonly matches: Match[] = [];
  public readonly rounds: Rounds;
  protected readonly repeat: boolean;

  constructor(teams: Team[], repeat: boolean) {
    super();
    this.teams = teams;
    this.repeat = repeat;

    this.rounds = this.createRounds();
    // console.log(JSON.stringify(this.rounds, null, 4));
  }

  private createRounds(): Rounds {
    let rounds: RoundRobin = roundrobin(this.teams.length, this.teams);

    if (this.repeat) {
      rounds = this.generateSecondHalf(rounds);
    }

    return this.createMatches(rounds);
  }

  private createMatches(rounds: RoundRobin): Rounds {
    const roundsWithMatches = rounds.map((round: Team[][]) => {
      const shuffledRound = shuffle(round);

      const newRound = shuffledRound.map((match: Team[]) => {
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

    secondHalf.forEach((round: Team[][]) => {
      round.forEach((match: Team[]) => {
        match.reverse();
      });
    });

    return [...firstHalf, ...secondHalf];
  }

  sortTeams(): void {
    this.teams.sort(RoundRobinTournament.compareTable);
  }

  private static compareTable(team1: Team, team2: Team) {
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

const vasco = new Team('Vasco', 'vasco.png', 1);
const flamengo = new Team('Flamengo', 'flamengo.png', 2);
const botafogo = new Team('Botafogo', 'botafogo.png', 3);
const fluminense = new Team('Fluminense', 'fluminense.png', 2);

const championship = new RoundRobinTournament([
  vasco,
  flamengo,
  botafogo,
  fluminense,
], true);
