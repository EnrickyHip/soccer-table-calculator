import type RoundRobinTeam from './RoundRobinTeam';
import Team from './Team';
import type { TieBreak } from './types';

export default class RoundRobinSort {
  private tieBreaks: TieBreak[];

  constructor(tieBreaks: TieBreak[]) {
    this.tieBreaks = tieBreaks;
  }

  public compareTable = (team1: RoundRobinTeam, team2: RoundRobinTeam) => {
    if (team1.points < team2.points) return 1; // 1 changes the position
    if (team1.points > team2.points) return -1; // -1 still the same

    for (let i = 0; i < this.tieBreaks.length; i++) { // ? não sei se isto está bem feito.
      const tieBreaker = this.tieBreaks[i];

      switch (tieBreaker) {
        case 'head-to-head': {
          const [team1Goals, team2Goals] = Team.headToHeadGoals(team1, team2);
          if (team1Goals > team2Goals) return -1;
          if (team1Goals < team2Goals) return 1;
          break;
        }

        default: {
          if (team1[tieBreaker] > team2[tieBreaker]) return -1;
          if (team1[tieBreaker] < team2[tieBreaker]) return 1;
        }
      }
    }

    if (team1.name < team2.name) return -1;
    if (team1.name > team2.name) return 1;
    return 0;
  };
}
