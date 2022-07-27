import { writable } from 'svelte/store';
import type RoundRobinTournament from 'src/API/RoundRobinTournament';
import type { RoundRobinStore } from 'src/app';
import type { Score } from '../../API/types/types';
import type Match from '../../API/Match';

let store: RoundRobinStore;

export function createRoundRobin(tournament: RoundRobinTournament): RoundRobinStore {
  const tournamentStore = writable(tournament);

  const playMatch = (match: Match, score: Score): void => {
    match.play(score.homeTeam, score.awayTeam);

    tournamentStore.update((storedTournament) => {
      storedTournament.sortTeams();
      return storedTournament;
    });
  };

  store = {
    subscribe: tournamentStore.subscribe,
    playMatch,
  };

  return store;
}

export function getStore() {
  return store;
}
