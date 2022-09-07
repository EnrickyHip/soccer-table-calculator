import type {
  Match, RoundRobinTournament, Score, SortableAttribute,
} from 'soccer-tournament';
import type { RoundRobinStore } from 'src/app';
import { writable } from 'svelte/store';

let store: RoundRobinStore;

export function createRoundRobin(tournament: RoundRobinTournament): RoundRobinStore {
  const tournamentStore = writable(tournament);

  const playMatch = (match: Match, score: Score): void => {
    match.play(score.homeTeam, score.awayTeam);
    tournamentStore.update((storedTournament) => storedTournament);
  };

  const sortBy = (attribute: SortableAttribute, reverse = false) => {
    tournamentStore.update((storedTournament) => {
      storedTournament.sortTeams(attribute, reverse);
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
