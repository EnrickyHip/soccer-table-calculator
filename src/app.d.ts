/// <reference types="@sveltejs/kit" />

import type { Subscriber, Unsubscriber } from 'svelte/store';
import type Match from './API/Match';
import type RoundRobinTournament from './API/RoundRobinTournament';
import type { ScoreProtocol, SortableAttribute } from './API/types';

export interface RoundRobinStore {
  subscribe: (this: void, run: Subscriber<RoundRobinTournament>) => Unsubscriber;
  playMatch: (match: Match, score: ScoreProtocol) => void;
  sortBy: (attribute: SortableAttribute) => void;
}
