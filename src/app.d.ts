/// <reference types="@sveltejs/kit" />

import type {
  Match, RoundRobinTournament, Score, SortableAttribute,
} from 'soccer-tournament';
import type { Subscriber, Unsubscriber } from 'svelte/store';

export interface RoundRobinStore {
  subscribe: (this: void, run: Subscriber<RoundRobinTournament>) => Unsubscriber;
  playMatch: (match: Match, score: Score) => void;
  sortBy: (attribute: SortableAttribute, direction: 1 | -1) => void;
}

export interface ClassificationNames {
  classified1?: string,
  classified2?: string,
  classified3?: string,
  playoff?: string,
  relegated?: string,
}
