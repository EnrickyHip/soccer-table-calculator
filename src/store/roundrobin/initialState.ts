import RoundRobinTournament from '../../modules/RoundRobinChampionship';
import RoundRobinTeam from '../../modules/RoundRobinTeam';

const teams = [
  new RoundRobinTeam('Vasco', 'vasco.png', 1),
  new RoundRobinTeam('Flamengo', 'flamengo.png', 2),
  new RoundRobinTeam('Botafogo', 'botafogo.png', 3),
  new RoundRobinTeam('Fluminense', 'fluminense.png', 4),
];

export default new RoundRobinTournament(teams, true);
