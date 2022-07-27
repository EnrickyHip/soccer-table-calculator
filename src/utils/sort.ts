import type RoundRobinTeam from 'src/API/RoundRobinTeam';

export const sortBy = (teams: RoundRobinTeam[], attribute: keyof RoundRobinTeam) => {
  return teams.sort((team1, team2) => {
    if (attribute !== 'position') {
      if (team1[attribute] < team2[attribute]) return 1;
      if (team1[attribute] > team2[attribute]) return -1;
    }

    if (attribute === 'losses' || attribute === 'counterGoals') {
      if (team1.position < team2.position) return 1;
      if (team1.position > team2.position) return -1;
    } else {
      if (team1.position > team2.position) return 1;
      if (team1.position < team2.position) return -1;
    }
    return 0;
  });
};
