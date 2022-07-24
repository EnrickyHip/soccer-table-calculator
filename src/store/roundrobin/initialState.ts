import RoundRobinTournament from '../../API/RoundRobinTournament';
import RoundRobinTeam from '../../API/RoundRobinTeam';

const teams = [
  new RoundRobinTeam('Avaí', 'avai.png', 1),
  new RoundRobinTeam('Flamengo', 'flamengo.png', 2),
  new RoundRobinTeam('Botafogo', 'botafogo.png', 3),
  new RoundRobinTeam('Fluminense', 'fluminense.png', 4),
  new RoundRobinTeam('Atlético-GO', 'atletico_go.png', 5),
  new RoundRobinTeam('Internacional', 'internacional.png', 6),
  new RoundRobinTeam('Cuiabá', 'cuiaba.png', 7),
  new RoundRobinTeam('Atlético-MG', 'atletico_mg.png', 8),
  new RoundRobinTeam('São Paulo', 'sao_paulo.png', 9),
  new RoundRobinTeam('Palmeiras', 'palmeiras.png', 10),
  new RoundRobinTeam('Santos', 'santos.png', 11),
  new RoundRobinTeam('Corinthians', 'corinthians.png', 12),
  new RoundRobinTeam('Juventude', 'juventude.png', 13),
  new RoundRobinTeam('Red Bull Bragantino', 'red_bull_bragantino.png', 14),
  new RoundRobinTeam('Goiás', 'goias.png', 15),
  new RoundRobinTeam('Athletico-PR', 'athletico.png', 16),
  new RoundRobinTeam('Coritiba', 'coritiba.png', 17),
  new RoundRobinTeam('América-MG', 'america_mg.png', 18),
  new RoundRobinTeam('Fortaleza', 'fortaleza.png', 19),
  new RoundRobinTeam('Ceará', 'ceara.png', 20),
];

export default new RoundRobinTournament(teams, true);
