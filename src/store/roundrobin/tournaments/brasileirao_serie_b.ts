import { RoundRobinTeam, RoundRobinTournament, tieBreaks } from 'soccer-tournament';
import type { ClassificationNames } from 'src/app';

const teams = [
  new RoundRobinTeam('Vasco', 'brasileirao-serie-b/vasco.png', 1),
  new RoundRobinTeam('Grêmio', 'brasileirao-serie-b/gremio.png', 2),
  new RoundRobinTeam('Cruzeiro', 'brasileirao-serie-b/cruzeiro.png', 3),
  new RoundRobinTeam('Bahia', 'brasileirao-serie-b/bahia.png', 4),
  new RoundRobinTeam('Sport', 'brasileirao-serie-b/sport.png', 5),
  new RoundRobinTeam('Tombense', 'brasileirao-serie-b/tombense.png', 6),
  new RoundRobinTeam('Sampaio Corrêa', 'brasileirao-serie-b/sampaio_correa.png', 7),
  new RoundRobinTeam('Ituano', 'brasileirao-serie-b/ituano.png', 8),
  new RoundRobinTeam('CRB', 'brasileirao-serie-b/crb.png', 9),
  new RoundRobinTeam('CSA', 'brasileirao-serie-b/csa.png', 10),
  new RoundRobinTeam('Operário', 'brasileirao-serie-b/operario.png', 11),
  new RoundRobinTeam('Chapecoense', 'brasileirao-serie-b/chapecoense.png', 12),
  new RoundRobinTeam('Brusque', 'brasileirao-serie-b/brusque.png', 13),
  new RoundRobinTeam('Guarani', 'brasileirao-serie-b/guarani.png', 14),
  new RoundRobinTeam('Ponte Preta', 'brasileirao-serie-b/ponte_preta.png', 15),
  new RoundRobinTeam('Londrina', 'brasileirao-serie-b/londrina.png', 16),
  new RoundRobinTeam('Vila Nova', 'brasileirao-serie-b/vila_nova.png', 17),
  new RoundRobinTeam('Grêmio Novorizontino', 'brasileirao-serie-b/novorizontino.png', 18),
  new RoundRobinTeam('Náutico', 'brasileirao-serie-b/nautico.png', 19),
  new RoundRobinTeam('Criciúma', 'brasileirao-serie-b/criciuma.png', 20),
];

const classification = {
  classified1: { min: 2, max: 4 },
  relegated: { min: 17, max: 20 },
};

export const classificationNames: ClassificationNames = {
  classified1: 'Série A',
  relegated: 'Relegated',
};

export default new RoundRobinTournament(teams, true, classification, [tieBreaks.wins, tieBreaks.goalDifference, tieBreaks.goals]);
