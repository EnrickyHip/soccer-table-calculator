import roundrobin from 'roundrobin';
import { shuffle } from '../utils/shuffle';
import Championship from './Championship';
import Match from './Match';
import { Team } from './Team';

type Rounds = Match[][];

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
    let rounds: Team[][][] = roundrobin(this.teams.length, this.teams);

    if (this.repeat) {
      const secondHalf = [...rounds];
      secondHalf.forEach((round: Team[][]) => {
        round.forEach((match: Team[]) => {
          match.reverse(); // reverse the teams
        });
      });

      rounds = [...rounds, ...secondHalf];
    }

    return this.createMatches(rounds);
  }

  private createMatches(rounds: Team[][][]): Rounds {
    return rounds.map((round: Team[][]) => {
      const shuffledRound = shuffle(round);

      const newRound = shuffledRound.map((match: Team[]): Match => {
        const homeTeam = match[0];
        const visitingTeam = match[1];
        const id = this.createMatches.length;

        const newMatch = new Match(homeTeam, visitingTeam, id);
        this.matches.push(newMatch);
        return newMatch;
      });

      return newRound;
    });
  }
}

const championship = new RoundRobinChampionship([
  new Team('Vasco', 'vasco', 1),
  new Team('Flamengo', 'Flamengo', 2),
  new Team('Fluminense', 'Fluminense', 3),
  new Team('Botafogo', 'Botafogo', 4),
], false);
