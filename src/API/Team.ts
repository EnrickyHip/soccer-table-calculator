import type Match from './Match';
import type { MatchesList } from './types/types';

export default abstract class Team {
  public readonly id: number;
  public readonly name: string;
  public readonly shield: string;
  protected matchesPlayedObject: MatchesList = {};

  constructor(name: string, shield: string, id: number) {
    this.name = name;
    this.shield = shield;
    this.id = id;
  }

  abstract playMatch(match: Match): void;
}
