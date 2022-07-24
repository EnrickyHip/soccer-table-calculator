import type { SortFn } from '../../global';

export const index: SortFn = (teams) => {
  return teams.sort((team1, team2) => {
    if (team1.index > team2.index) return 1;
    if (team1.index < team2.index) return -1;
    return 0;
  });
};

export const matches: SortFn = (teams) => {
  return teams.sort((team1, team2) => {
    if (team1.matchesPlayed < team2.matchesPlayed) return 1;
    if (team1.matchesPlayed > team2.matchesPlayed) return -1;
    return 0;
  });
};

export const wins: SortFn = (teams) => {
  return teams.sort((team1, team2) => {
    if (team1.wins < team2.wins) return 1;
    if (team1.wins > team2.wins) return -1;
    return 0;
  });
};

export const draws: SortFn = (teams) => {
  return teams.sort((team1, team2) => {
    if (team1.draws < team2.draws) return 1;
    if (team1.draws > team2.draws) return -1;
    return 0;
  });
};

export const losses: SortFn = (teams) => {
  return teams.sort((team1, team2) => {
    if (team1.losses < team2.losses) return 1;
    if (team1.losses > team2.losses) return -1;
    return 0;
  });
};

export const goals: SortFn = (teams) => {
  return teams.sort((team1, team2) => {
    if (team1.goals < team2.goals) return 1;
    if (team1.goals > team2.goals) return -1;
    return 0;
  });
};

export const counterGoals: SortFn = (teams) => {
  return teams.sort((team1, team2) => {
    if (team1.counterGoals < team2.counterGoals) return 1;
    if (team1.counterGoals > team2.counterGoals) return -1;
    return 0;
  });
};

export const difference: SortFn = (teams) => {
  return teams.sort((team1, team2) => {
    if (team1.goalDifference < team2.goalDifference) return 1;
    if (team1.goalDifference > team2.goalDifference) return -1;
    return 0;
  });
};

export const percentage: SortFn = (teams) => {
  return teams.sort((team1, team2) => {
    if (team1.percentage < team2.percentage) return 1;
    if (team1.percentage > team2.percentage) return -1;

    if (team1.index > team2.index) return 1;
    if (team1.index < team2.index) return -1;
    return 0;
  });
};
