import roundrobin from 'roundrobin';
import { shuffle } from '../utils/shuffle';
import Championship from './Championship';
import Match from './Match';
import { Team } from './Team';

type Round = Match[];
export type Rounds = Round[];
type RoundRobin = Team[][][];

export default class RoundRobinChampionship extends Championship {
  public readonly teams: Team[];
  public readonly matches: Match[] = [];
  public readonly rounds: Rounds;
  private readonly repeat: boolean;

  constructor(teams: Team[], repeat: boolean) {
    super();
    this.teams = teams;
    this.repeat = repeat;

    this.rounds = this.createRounds();
    console.log(JSON.stringify(this.rounds, null, 4));
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
}

const championship = new RoundRobinChampionship([
  new Team('Vasco', 'vasco.png', 1),
  new Team('Flamengo', 'flamengo.png', 2),
  new Team('Fluminense', 'fluminense.png', 3),
  new Team('Botafogo', 'botafogo.png', 4),
], true);
