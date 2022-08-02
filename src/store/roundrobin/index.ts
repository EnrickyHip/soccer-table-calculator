import { writable } from 'svelte/store';
import type RoundRobinTournament from 'src/API/RoundRobinTournament';
import type { RoundRobinStore } from 'src/app';
import type { ScoreProtocol, SortableAttribute } from 'src/API/types';
import type Match from '../../API/Match';

let store: RoundRobinStore;

export function createRoundRobin(tournament: RoundRobinTournament): RoundRobinStore {
  const tournamentStore = writable(tournament);

  const playMatch = (match: Match, score: ScoreProtocol): void => {
    match.play(score.homeTeam, score.awayTeam);
    tournamentStore.update((storedTournament) => {
      storedTournament.sortTeams();
      return storedTournament;
    });
  };

  const sortBy = (attribute: SortableAttribute, direction: 1 | -1) => {
    tournamentStore.update((storedTournament) => {
      storedTournament.sortTeams(attribute, direction);
      return storedTournament;
    });
  };

  store = {
    subscribe: tournamentStore.subscribe,
    sortBy,
    playMatch,
  };

  return store;
}

export function getStore() {
  return store;
}
