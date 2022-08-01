/// <reference types="@sveltejs/kit" />

import type { Subscriber, Unsubscriber } from 'svelte/store';
import type Match from './API/Match';
import type RoundRobinTeam from './API/RoundRobinTeam';
import type RoundRobinTournament from './API/RoundRobinTournament';
import type { ScoreProtocol } from './API/types';

export interface SortEventDetail {
  detail: {
    attribute : keyof RoundRobinTeam;
  }
}
export interface RoundRobinStore {
  subscribe: (this: void, run: Subscriber<RoundRobinTournament>) => Unsubscriber;
  playMatch: (match: Match, score: ScoreProtocol) => void;
}
