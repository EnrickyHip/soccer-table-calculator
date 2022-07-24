/// <reference types="svelte" />

import type RoundRobinTeam from './API/RoundRobinTeam';

export type SortFn = (teams: RoundRobinTeam[]) => RoundRobinTeam[]
export interface SortEventDetail {
  detail: {
    sortBy : SortFn
  }
}
