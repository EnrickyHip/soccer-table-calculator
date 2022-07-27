import type Match from './Match';
import type { MatchesObject } from './types/types';

export default abstract class Team {
  public readonly id: number;
  public readonly name: string;
  public readonly shield: string;
  protected readonly matchesPlayedObject: MatchesObject = {};

  constructor(name: string, shield: string, id: number) {
    this.name = name;
    this.shield = shield;
    this.id = id;
  }

  abstract playMatch(match: Match): void;
}
