import { writable } from 'svelte/store';
import type { Score } from '../../API/types/types';
import type Match from '../../API/Match';
import initialState from './initialState';

const roundrobinStore = writable(initialState);

const playMatch = (match: Match, score: Score): void => {
  match.play(score.homeTeam, score.awayTeam);

  roundrobinStore.update((championship) => {
    championship.sortTeams();
    return championship;
  });
};

const customStore = {
  subscribe: roundrobinStore.subscribe,
  playMatch,
};

export default customStore;
