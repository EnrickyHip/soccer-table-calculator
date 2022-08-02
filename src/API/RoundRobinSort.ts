import type RoundRobinTeam from './RoundRobinTeam';
import Team from './Team';
import type { SortableAttribute, TieBreak } from './types';

export default class RoundRobinSort {
  private tieBreaks: TieBreak[];
  public sortAttribute: keyof RoundRobinTeam = 'position';

  constructor(tieBreaks: TieBreak[]) {
    this.tieBreaks = tieBreaks;
  }

  public customSort = (attribute?: SortableAttribute, sentDirection?: 1 | -1) => {
    if (attribute) this.sortAttribute = attribute;
    const direction = sentDirection || 1;

    return (team1: RoundRobinTeam, team2: RoundRobinTeam) => {
      if (attribute !== 'position') {
        if (team1[this.sortAttribute] < team2[this.sortAttribute]) return 1 * direction;
        if (team1[this.sortAttribute] > team2[this.sortAttribute]) return -1 * direction;
      }

      if (team1.position > team2.position) return 1 * direction;
      if (team1.position < team2.position) return -1 * direction;
      return 0;
    };
  };

  public positionSort = (team1: RoundRobinTeam, team2: RoundRobinTeam) => {
    if (team1.points < team2.points) return 1; // 1 changes the position
    if (team1.points > team2.points) return -1; // -1 still the same

    // ? não sei se isto está bem feito.
    for (let i = 0; i < this.tieBreaks.length; i++) {
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
