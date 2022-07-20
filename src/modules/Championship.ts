import type Match from './Match';
import type { Team } from './Team';

export default abstract class Championship {
  public abstract teams: Team[];
  public abstract matches: Match[];
}
