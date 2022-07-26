import RoundRobinTournament from '../../../API/RoundRobinTournament';
import RoundRobinTeam from '../../../API/RoundRobinTeam';

const teams = [
  new RoundRobinTeam('Liverpool', 'premier_league/liverpool.png', 1),
  new RoundRobinTeam('Manchester United', 'premier_league/man_united.png', 2),
  new RoundRobinTeam('Manchester City', 'premier_league/man_city.png', 3),
  new RoundRobinTeam('Arsenal', 'premier_league/arsenal.png', 4),
  new RoundRobinTeam('Chelsea', 'premier_league/chelsea.png', 5),
  new RoundRobinTeam('Tottenham', 'premier_league/tottenham.png', 6),
  new RoundRobinTeam('Nottingham Forest', 'premier_league/nottingham_forest.png', 7),
  new RoundRobinTeam('Everton', 'premier_league/everton.png', 8),
  new RoundRobinTeam('Brighton', 'premier_league/brighton.png', 9),
  new RoundRobinTeam('Bournemouth', 'premier_league/bournemouth.png', 10),
  new RoundRobinTeam('Brentford', 'premier_league/brentford.png', 11),
  new RoundRobinTeam('Wolverhampton', 'premier_league/wolves.png', 12),
  new RoundRobinTeam('Leicester City', 'premier_league/leicester.png', 13),
  new RoundRobinTeam('Aston Villa', 'premier_league/aston_villa.png', 14),
  new RoundRobinTeam('Leeds United', 'premier_league/leeds.png', 15),
  new RoundRobinTeam('Fulham', 'premier_league/fulham.png', 16),
  new RoundRobinTeam('Crystal Palace', 'premier_league/crystal_palace.png', 17),
  new RoundRobinTeam('West Ham', 'premier_league/west_ham.png', 18),
  new RoundRobinTeam('Southampton', 'premier_league/southampton.png', 19),
  new RoundRobinTeam('Newcastle', 'premier_league/newcastle.png', 20),
];

export default new RoundRobinTournament(teams, true);
